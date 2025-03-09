import { Canvas, CanvasRenderingContext2D, createCanvas, ImageData } from 'canvas';
import zlib from 'zlib';
import { readBufferString } from '../../../../utils';
import { Bif } from '../../../bif';
import { Res } from '../res';
import { Palette } from './palette';

export class ResBam extends Res {
  private signature: string;

  private v: string;

  private raw: Uint8ClampedArray;

  private _image: string;

  private size: Electron.Size = {
    width: null,
    height: null,
  };

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('BAM', buffer, bifs);
  }

  public get image(): string {
    if (!this._image) {
      this.decide(this.file);
    }

    if (!this.valid) {
      return null;
    }

    return this._image;
  }

  private decide(bam: Buffer): void {
    this.signature = readBufferString(bam, 0x0, 4).trim();

    this.v = readBufferString(bam, 0x4, 4).trim();

    if (this.v === 'V1') {
      if (this.signature === 'BAM') {
        return this.v1Bam(bam);
      } else {
        return this.v1BamC(bam);
      }
    } else {
      return this.v2(bam);
    }
  }

  private v1Bam(bam: Buffer): void {
    const framesOffset: number = bam.readUint32LE(0xc);

    this.size.width = bam.readUint16LE(framesOffset + 0x0);

    this.size.height = bam.readUint16LE(framesOffset + 0x2);

    if (!this.size.width || !this.size.height) {
      this.valid = false;

      return;
    }

    const palette: Palette = new Palette(bam, 0x10);

    const meta: Int32Array = new Int32Array([bam.readInt32LE(framesOffset + 0x8)]);

    const dataOffset: number = meta[0] & 0x7fffffff;

    const rle: boolean = !(meta[0] >> 31);

    const data: Buffer = bam.subarray(dataOffset, bam.length);

    rle ? this.v1BamRle(data, palette) : this.v1BamNoRle(data, palette);
  }

  private v1BamNoRle(pxData: Buffer, palette: Palette): void {
    this.raw = new Uint8ClampedArray(this.size.width * this.size.height * 4);

    for (let i: number = 0; i < this.size.width * this.size.height; i++) {
      const paletteIdx: number = pxData.readUint8(i);

      const paletteValue: number[] = palette.values[paletteIdx];

      this.raw[i + 2] = paletteValue[0];
      this.raw[i + 1] = paletteValue[1];
      this.raw[i + 0] = paletteValue[2];
      this.raw[i + 3] = paletteValue[3];
    }

    return this.svg();
  }

  private v1BamRle(pxData: Buffer, palette: Palette): void {
    this.raw = new Uint8ClampedArray(this.size.width * this.size.height * 4);

    let pxIdx: number = 0;

    let written: number = 0;

    while (written < this.raw.length) {
      const paletteIdx: number = pxData.readUint8(pxIdx);

      const paletteValue: number[] = palette.values[paletteIdx];

      let repeats: number = 0;

      if (paletteIdx === palette.rleIndex) {
        repeats = pxData.readUint8(pxIdx + 1);

        pxIdx++;
      }

      for (let i: number = 0; i <= repeats; i++) {
        this.raw[written + 2] = paletteValue[0];
        this.raw[written + 1] = paletteValue[1];
        this.raw[written + 0] = paletteValue[2];
        this.raw[written + 3] = paletteValue[3];

        written += 4;
      }

      pxIdx++;
    }

    this.svg();
  }

  private svg(): void {
    const canvas: Canvas = createCanvas(this.size.width, this.size.height);

    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const imageData: ImageData = new ImageData(this.raw, this.size.width, this.size.height);

    ctx.putImageData(imageData, 0, 0);

    this._image = canvas.toBuffer('image/png').toString('base64');
  }

  private v1BamC(buffer: Buffer): void {
    const data: Buffer = buffer.subarray(0xc, buffer.length);

    const subBam: Buffer = zlib.inflateSync(data);

    return this.decide(subBam);
  }

  private v2(buffer: Buffer): void {
    this.valid = false;
  }
}
