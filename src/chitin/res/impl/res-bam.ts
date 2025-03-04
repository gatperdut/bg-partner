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

    const file: Buffer = this.bif.files[this.fileIndex];

    this.signature = readBufferString(file, 0x0, 4).trim();

    this.v = readBufferString(file, 0x4, 4).trim();

    if (this.v === 'V1') {
      if (this.signature === 'BAM') {
        this.v1BAM(file);
      } else {
        this.v1BAMC(file);
      }
    } else {
      this.v2(file);
    }
  }

  private v1BAM(buffer: Buffer): void {
    const frameEntriesOffset: number = buffer.readUint32LE(0xc);

    this.size.width = buffer.readUint16LE(frameEntriesOffset + 0x0);

    this.size.height = buffer.readUint16LE(frameEntriesOffset + 0x2);

    this.center.x = buffer.readUint16LE(frameEntriesOffset + 0x4);

    this.center.y = buffer.readUint16LE(frameEntriesOffset + 0x6);

    const frameEntryMeta: Int32Array = new Int32Array(1);

    frameEntryMeta[0] = buffer.readInt32LE(frameEntriesOffset + 0x8);

    const frameDataOffset: number = frameEntryMeta[0] & 0x7fffffff;

    const frameDataCompressed: boolean = !!(frameEntryMeta[0] >> 31);

    frameDataCompressed
      ? this.v1BAMCompressed(buffer)
      : this.v1BAMUncompressed(buffer, frameDataOffset);
  }

  private v1BAMCompressed(buffer: Buffer): void {
    // Empty
  }

  private v1BAMUncompressed(buffer: Buffer, frameDataOffset: number): void {
    this.paletteSet(buffer, 0x10);

    const imageLength = this.size.width * this.size.height;

    let count: number = 0;

    const image: Buffer = Buffer.alloc(imageLength * 4);

    let i = 0;

    while (count < imageLength) {
      const index: number = buffer.readUint8(frameDataOffset + i);

      if (index === 0) {
        const repeats = buffer.readUint8(frameDataOffset + i + 1);
        for (let j = 0; j < repeats + 1; j++) {
          image.writeUInt8(0x00, count * 4 + 0);
          image.writeUInt8(0x00, count * 4 + 1);
          image.writeUInt8(0x00, count * 4 + 2);
          image.writeUInt8(0xff, count * 4 + 3);
        }
        count += repeats + 1;
        i++;
      } else {
        image.writeUInt8(this.palette[index][0], count * 4 + 2);
        image.writeUInt8(this.palette[index][1], count * 4 + 1);
        image.writeUInt8(this.palette[index][2], count * 4 + 0);
        image.writeUInt8(this.palette[index][3], count * 4 + 3);
        count += 1;
      }

      i++;
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

    const subSignature: string = readBufferString(subBAM, 0x0, 4).trim();

    const subV: string = readBufferString(subBAM, 0x4, 4).trim();

    const length: number = buffer.readInt32LE(0x8);

    console.log(`read ${length}, got ${subBAM.length}`);

    if (subV === 'V1') {
      if (subSignature === 'BAM') {
        this.v1BAM(subBAM);
      } else {
        this.v1BAMC(subBAM);
      }
    } else {
      this.v2(subBAM);
    }
  }

  private v2(buffer: Buffer): void {
    // Empty
  }

  private paletteSet(buffer: Buffer, offset: number): void {
    const paletteOffset: number = buffer.readUint32LE(offset);

    this.palette = _.chunk([...buffer.subarray(paletteOffset, paletteOffset + 256 * 4)], 4);
  }
}
