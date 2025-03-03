import zlib from 'zlib';
import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';
export class ResBAM extends Res {
  public image: Buffer;

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

  private paletteSet(buffer: Buffer, offset: number): void {
    const paletteOffset: number = buffer.readUint32LE(offset);

    this.palette = buffer.subarray(paletteOffset, paletteOffset + 256 * 4);
  }

  private v1BAM(buffer: Buffer): void {
    const frameEntriesOffset: number = buffer.readUint32LE(0xc);

    const width: number = buffer.readUint16LE(frameEntriesOffset + 0x0);

    const height: number = buffer.readUint16LE(frameEntriesOffset + 0x2);

    const frameEntryMeta: Uint32Array = new Uint32Array(1);

    frameEntryMeta[0] = buffer.readInt32LE(frameEntriesOffset + 0x8);

    const frameDataOffset: number = frameEntryMeta[0] & 0x7fffffff;

    const frameDataCompressed: boolean = !!(frameEntryMeta[0] >> 31);

    frameDataCompressed
      ? this.v1BAMCompressed(buffer)
      : this.v1BAMUncompressed(buffer, frameDataOffset, width, height);
  }

  private v1BAMCompressed(buffer: Buffer): void {
    // Empty
  }

  private v1BAMUncompressed(
    buffer: Buffer,
    frameDataOffset: number,
    width: number,
    height: number
  ): void {
    this.paletteSet(buffer, 0x10);

    const squared: number = width * height;

    this.image = Buffer.alloc(squared * 4);

    for (let i: number = 0; i < squared; i++) {
      const imageBase: number = i * 4;

      const bufferBase: number = frameDataOffset + i;

      this.image.writeUInt8(this.palette.readUint8(buffer[bufferBase] + 0), imageBase + 0);
      this.image.writeUInt8(this.palette.readUint8(buffer[bufferBase] + 1), imageBase + 1);
      this.image.writeUInt8(this.palette.readUint8(buffer[bufferBase] + 2), imageBase + 2);
      this.image.writeUInt8(this.palette.readUint8(buffer[bufferBase] + 3), imageBase + 3);
    }
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
}
