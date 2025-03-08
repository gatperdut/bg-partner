import { Bif } from '../../../chitin/bif';
import { projTable } from '../../../tables/proj';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResItm extends Res {
  public bam: string;

  // TODO make this keyof ProjTable
  public pro: string;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('ITM', buffer, bifs);

    const signature: string = readBufferString(this.file, 0x0, 4).trim();

    const v: string = readBufferString(this.file, 0x4, 4).trim();

    this.bam = readBufferString(this.file, 0x3a, 8).toLowerCase();

    const extHeadersCount: number = this.file.readUint16LE(0x68);

    if (extHeadersCount > 0) {
      const extHeadersOff: number = this.file.readUint32LE(0x64);

      const attackType: number = this.file.readUInt8(extHeadersOff + 0x0);

      if (attackType === 2) {
        this.pro = projTable[this.file.readUInt16LE(extHeadersOff + 0x2a)];
      }
    }
  }
}
