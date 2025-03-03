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

  private palette: Buffer;

  constructor(buffer: Buffer, private bifs: Bif[]) {
    super('BAM', buffer, bifs);

    if (!this.name.includes('SPWI408')) {
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

    const frameEntryMeta: Uint32Array = new Uint32Array(1);

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

    const image: Buffer = Buffer.alloc(this.size.width * this.size.height * 4);

    let transparentIndex: number = null;

    for (let h: number = 0; h < this.size.height; h++) {
      for (let w: number = 0; w < this.size.width; w++) {
        const imageBase: number = (h * this.size.width + w) * 4;

        const bufferBase: number = frameDataOffset + h * this.size.width + w;

        const paletteIndex: number = buffer[bufferBase];

        const paletteEntry: number[] = [
          this.palette.readUint8(paletteIndex * 4 + 0),
          this.palette.readUint8(paletteIndex * 4 + 1),
          this.palette.readUint8(paletteIndex * 4 + 2),
          this.palette.readUint8(paletteIndex * 4 + 3),
        ];

        if (_.isNull(transparentIndex)) {
          if (
            paletteEntry[0] === 0 &&
            paletteEntry[1] === 255 &&
            paletteEntry[2] === 0 &&
            paletteEntry[3] === 0
          ) {
            transparentIndex = paletteIndex;
          }
        }

        if (paletteIndex === transparentIndex) {
          image.writeUInt8(0xff, imageBase + 0);
          image.writeUInt8(0xff, imageBase + 1);
          image.writeUInt8(0xff, imageBase + 2);
          image.writeUInt8(0x00, imageBase + 3);
        } else {
          image.writeUInt8(paletteEntry[2], imageBase + 0);
          image.writeUInt8(paletteEntry[1], imageBase + 1);
          image.writeUInt8(paletteEntry[0], imageBase + 2);
          image.writeUInt8(paletteEntry[3], imageBase + 3);
        }
      }
    }

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

    this.palette = buffer.subarray(paletteOffset, paletteOffset + 256 * 4);
  }
}
