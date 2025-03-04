import _ from 'lodash-es';
import sharp from 'sharp';
import zlib from 'zlib';
import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResBAM extends Res {
  public image: Buffer;

  public size: Electron.Size = {
    width: null,
    height: null,
  };

  public center: Electron.Point = {
    x: null,
    y: null,
  };

  private palette: number[][];

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('BAM', buffer, bifs);

    if (this.name !== 'SPWI408C') {
      return;
    }

    this.decide(this.file);
  }

  private decide(buffer: Buffer): void {
    const signature: string = readBufferString(buffer, 0x0, 4).trim();

    const v: string = readBufferString(buffer, 0x4, 4).trim();

    if (v === 'V1') {
      if (signature === 'BAM') {
        this.v1BAM(buffer);
      } else {
        this.v1BAMC(buffer);
      }
    } else {
      this.v2(buffer);
    }
  }

  private v1BAM(buffer: Buffer): void {
    const frameEntriesOffset: number = buffer.readUint32LE(0xc);

    this.size.width = buffer.readUint16LE(frameEntriesOffset + 0x0);

    this.size.height = buffer.readUint16LE(frameEntriesOffset + 0x2);

    this.center.x = buffer.readUint16LE(frameEntriesOffset + 0x4);

    this.center.y = buffer.readUint16LE(frameEntriesOffset + 0x6);

    const meta: Int32Array = new Int32Array(1);

    meta[0] = buffer.readInt32LE(frameEntriesOffset + 0x8);

    const dataOffset: number = meta[0] & 0x7fffffff;

    const rle: boolean = !(meta[0] >> 31);

    rle ? this.v1BAMRle(buffer, dataOffset) : this.v1BAMNoRle(buffer, dataOffset);
  }

  private v1BAMNoRle(buffer: Buffer, frameDataOffset: number): void {
    // Empty
  }

  private v1BAMRle(buffer: Buffer, dataOffset: number): void {
    this.paletteSet(buffer, 0x10);

    const pixels: number = this.size.width * this.size.height;

    let pixelIndex: number = 0;

    const image: Buffer = Buffer.alloc(pixels * 4);

    let bytesWritten: number = 0;

    while (bytesWritten < pixels) {
      const paletteIndex: number = buffer.readUint8(dataOffset + pixelIndex);

      if (paletteIndex === 0) {
        const repeats = buffer.readUint8(dataOffset + pixelIndex + 1);

        for (let i: number = 0; i < repeats + 1; i++) {
          image.writeUInt8(0x00, bytesWritten * 4 + 0);
          image.writeUInt8(0x00, bytesWritten * 4 + 1);
          image.writeUInt8(0x00, bytesWritten * 4 + 2);
          image.writeUInt8(0xff, bytesWritten * 4 + 3);
        }

        bytesWritten += repeats + 1;

        pixelIndex++;
      } else {
        image.writeUInt8(this.palette[paletteIndex][0], bytesWritten * 4 + 2);
        image.writeUInt8(this.palette[paletteIndex][1], bytesWritten * 4 + 1);
        image.writeUInt8(this.palette[paletteIndex][2], bytesWritten * 4 + 0);
        image.writeUInt8(this.palette[paletteIndex][3], bytesWritten * 4 + 3);

        bytesWritten += 1;
      }

      pixelIndex++;
    }

    console.log('DONE');
    sharp(image, { raw: { width: this.size.width, height: this.size.height, channels: 4 } })
      .toFormat('png')
      .toBuffer()
      .then((buffer: Buffer): void => {
        this.image = buffer;
      });
  }

  private v1BAMC(buffer: Buffer): void {
    const data: Buffer = buffer.subarray(0xc, buffer.length);

    const subBAM: Buffer = zlib.inflateSync(data);

    this.decide(subBAM);
  }

  private v2(buffer: Buffer): void {
    // Empty
  }

  private paletteSet(buffer: Buffer, offset: number): void {
    const paletteOffset: number = buffer.readUint32LE(offset);

    this.palette = _.chunk([...buffer.subarray(paletteOffset, paletteOffset + 256 * 4)], 4);
  }
}
