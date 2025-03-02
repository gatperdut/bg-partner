import zlib from 'zlib';
import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';
export class ResBAM extends Res {
  private image: Buffer;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('BAM', buffer, bifs);

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

  private v1BAM(file: Buffer): void {
    const frameEntriesOffset: number = file.readUint32LE(0xc);

    const width: number = file.readUint16LE(frameEntriesOffset + 0x0);

    const height: number = file.readUint16LE(frameEntriesOffset + 0x2);

    const frameData: Uint32Array = new Uint32Array(1);

    frameData[0] = file.readInt32LE(frameEntriesOffset + 0x8);

    const frameDataOffset: number = frameData[0] & 0x7fffffff;

    const frameDataCompressed: boolean = !!(frameData[0] >> 31);
  }

  private v1BAMC(file: Buffer): void {
    const data: Buffer = file.subarray(0xc, file.length);

    this.image = zlib.inflateSync(data);
  }

  private v2(file: Buffer): void {
    // Empty
  }
}
