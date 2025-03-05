import sharp from 'sharp';
import zlib from 'zlib';
import { readBufferString } from '../../../../utils';
import { Bif } from '../../../bif';
import { Res } from '../res';
import { Palette } from './palette';

export class ResBam extends Res {
  private imageBuffer: Buffer;

  public size: Electron.Size = {
    width: null,
    height: null,
  };

  public center: Electron.Point = {
    x: null,
    y: null,
  };

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('BAM', buffer, bifs);

    // if (this.name !== 'SPPR725C') {
    //   return;
    // }

    // this.decide(this.file);
  }

  public image(): Promise<Buffer> {
    if (this.imageBuffer) {
      return Promise.resolve(this.imageBuffer);
    }

    return this.decide(this.file);
  }

  private decide(bam: Buffer): Promise<Buffer> {
    const signature: string = readBufferString(bam, 0x0, 4).trim();

    const v: string = readBufferString(bam, 0x4, 4).trim();

    if (v === 'V1') {
      if (signature === 'BAM') {
        return this.v1Bam(bam);
      } else {
        return this.v1BamC(bam);
      }
    } else {
      return this.v2(bam);
    }
  }

  private v1Bam(bam: Buffer): Promise<Buffer> {
    const framesOffset: number = bam.readUint32LE(0xc);

    const palette: Palette = new Palette(bam, 0x10);

    this.size.width = bam.readUint16LE(framesOffset + 0x0);

    this.size.height = bam.readUint16LE(framesOffset + 0x2);

    if (!this.size.width || !this.size.height) {
      return;
    }

    this.center.x = bam.readUint16LE(framesOffset + 0x4);

    this.center.y = bam.readUint16LE(framesOffset + 0x6);

    const meta: Int32Array = new Int32Array(1);

    meta[0] = bam.readInt32LE(framesOffset + 0x8);

    const dataOffset: number = meta[0] & 0x7fffffff;

    const rle: boolean = !(meta[0] >> 31);

    const data: Buffer = bam.subarray(dataOffset, bam.length);

    return rle ? this.v1BamRle(data, palette) : this.v1BamNoRle(data, palette);
  }

  private v1BamNoRle(pxData: Buffer, palette: Palette): Promise<Buffer> {
    const image: Buffer = Buffer.alloc(this.size.width * this.size.height * 4);

    for (let i: number = 0; i < this.size.width * this.size.height; i++) {
      const paletteIdx: number = pxData.readUint8(i);

      const paletteValue: number[] = palette.values[paletteIdx];

      image.writeUInt8(paletteValue[0], i + 2);
      image.writeUInt8(paletteValue[1], i + 1);
      image.writeUInt8(paletteValue[2], i + 0);
      image.writeUInt8(paletteValue[3], i + 3);
    }

    console.log(this.name, this.size.width, this.size.height);

    return this.svg(image);
  }

  private v1BamRle(pxData: Buffer, palette: Palette): Promise<Buffer> {
    const image: Buffer = Buffer.alloc(this.size.width * this.size.height * 4);

    let pxIdx: number = 0;

    let written: number = 0;

    while (written < image.length) {
      const paletteIdx: number = pxData.readUint8(pxIdx);

      const paletteValue: number[] = palette.values[paletteIdx];

      let repeats: number = 0;

      if (paletteIdx === palette.rleIndex) {
        repeats = pxData.readUint8(pxIdx + 1);

        pxIdx++;
      }

      for (let i: number = 0; i <= repeats; i++) {
        image.writeUInt8(paletteValue[0], written + 2);
        image.writeUInt8(paletteValue[1], written + 1);
        image.writeUInt8(paletteValue[2], written + 0);
        image.writeUInt8(paletteValue[3], written + 3);

        written += 4;
      }

      pxIdx++;
    }

    return this.svg(image);
  }

  private svg(image: Buffer): Promise<Buffer> {
    return <Promise<Buffer>>sharp(image, {
      raw: { width: this.size.width, height: this.size.height, channels: 4 },
    })
      .toFormat('png')
      .toBuffer()
      .then((buffer: Buffer): Buffer => {
        this.imageBuffer = buffer;

        return buffer;

        // console.log(this.name);
      });
  }

  private v1BamC(buffer: Buffer): Promise<Buffer> {
    const data: Buffer = buffer.subarray(0xc, buffer.length);

    const subBam: Buffer = zlib.inflateSync(data);

    return this.decide(subBam);
  }

  private v2(buffer: Buffer): Promise<Buffer> {
    return Promise.resolve(null);
  }
}
