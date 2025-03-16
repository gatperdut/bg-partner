import { Bif } from '@chitin/bif';
import { Palette } from '@chitin/res/impl/bam/palette';
import { Res } from '@chitin/res/impl/res';
import { readBufferString } from '@utils';
import { PNG } from 'pngjs';
import zlib from 'zlib';

export class ResBam extends Res {
  private signature: string;

  private v: string;

  private png: PNG;

  private _base64: string;

  public size: Electron.Size = {
    width: null,
    height: null,
  };

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('BAM', buffer, bifs);
  }

  public get base64(): string {
    if (!this._base64) {
      this.decide(this.file);
    }

    return this._base64;
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

    const frames: number = bam.readUint16LE(0x8);

    const lookupOffset: number = bam.readUint32LE(0x14);

    const cyclesOffset: number = framesOffset + frames * 12;

    const lookupIndex: number = bam.readUint16LE(cyclesOffset + 0x2);

    const frameIndex: number = bam.readUint16LE(lookupOffset + lookupIndex * 2);

    const frameOffset: number = framesOffset + frameIndex * 12;

    this.size.width = bam.readUint16LE(frameOffset + 0x0);

    this.size.height = bam.readUint16LE(frameOffset + 0x2);

    this.png = new PNG({ width: this.size.width, height: this.size.height });

    if (!this.size.width || !this.size.height) {
      return;
    }

    const palette: Palette = new Palette(bam, 0x10);

    const meta: Int32Array = new Int32Array([bam.readInt32LE(frameOffset + 0x8)]);

    const dataOffset: number = meta[0] & 0x7fffffff;

    const rle: boolean = !(meta[0] >> 31);

    const data: Buffer = bam.subarray(dataOffset, bam.length);

    rle ? this.v1BamRle(data, palette) : this.v1BamNoRle(data, palette);
  }

  private v1BamNoRle(pxData: Buffer, palette: Palette): void {
    for (let i: number = 0; i < this.size.width * this.size.height; i++) {
      const paletteIdx: number = pxData.readUint8(i);

      const paletteValue: number[] = palette.values[paletteIdx];

      this.png.data[i * 4 + 2] = paletteValue[0];
      this.png.data[i * 4 + 1] = paletteValue[1];
      this.png.data[i * 4 + 0] = paletteValue[2];
      this.png.data[i * 4 + 3] = paletteIdx === palette.rleIdx ? paletteValue[3] : 0xff;
    }

    this.crop();

    this.svg();
  }

  private v1BamRle(pxData: Buffer, palette: Palette): void {
    let pxIdx: number = 0;

    let written: number = 0;

    while (written < this.png.data.length) {
      const paletteIdx: number = pxData.readUint8(pxIdx);

      const paletteValue: number[] = palette.values[paletteIdx];

      let repeats: number = 0;

      if (paletteIdx === palette.rleIdx) {
        repeats = pxData.readUint8(pxIdx + 1);

        pxIdx++;
      }

      for (let i: number = 0; i <= repeats; i++) {
        this.png.data[written + 2] = paletteValue[0];
        this.png.data[written + 1] = paletteValue[1];
        this.png.data[written + 0] = paletteValue[2];
        this.png.data[written + 3] = paletteIdx === palette.rleIdx ? paletteValue[3] : 0xff;

        written += 4;
      }

      pxIdx++;
    }

    this.crop();

    this.svg();
  }

  private crop(): void {
    let top: number = this.size.height;

    let bottom: number = 0;

    let left: number = this.size.width;

    let right: number = 0;

    for (let h: number = 0; h < this.size.height; h++) {
      for (let w: number = 0; w < this.size.width; w++) {
        const idx: number = (this.size.width * h + w) * 4;

        const alpha: number = this.png.data[idx + 3];

        if (alpha > 0) {
          top = Math.min(top, h);
          bottom = Math.max(bottom, h);
          left = Math.min(left, w);
          right = Math.max(right, w);
        }
      }
    }

    const cropped: Electron.Size = {
      width: right - left + 1,
      height: bottom - top + 1,
    };

    if (this.size.width === cropped.width && this.size.height === cropped.height) {
      return;
    }

    const data: Uint8Array = new Uint8Array(cropped.width * cropped.height * 4);

    for (let h: number = top; h <= bottom; h++) {
      for (let w: number = left; w <= right; w++) {
        const originalIdx: number = (this.size.width * h + w) * 4;

        const newIdx: number = ((h - top) * cropped.width + (w - left)) * 4;

        data.set(this.png.data.slice(originalIdx, originalIdx + 4), newIdx);
      }
    }

    this.png = new PNG({ width: cropped.width, height: cropped.height });

    this.png.data = Buffer.from(data);

    this.size.width = cropped.width;

    this.size.height = cropped.height;
  }

  private svg(): void {
    this._base64 = PNG.sync.write(this.png).toString('base64');
  }

  private v1BamC(buffer: Buffer): void {
    const data: Buffer = buffer.subarray(0xc, buffer.length);

    const subBam: Buffer = zlib.inflateSync(data);

    return this.decide(subBam);
  }

  private v2(buffer: Buffer): void {
    console.log('BAM V2 to be implemented.');
  }
}
