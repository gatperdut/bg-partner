import { Bif } from '../../../chitin/bif';
import { proTable, ProTableKey, ProTableValue } from '../../../tables/pro';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResItm extends Res {
  public bam: string;

  public pro: ProTableValue;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('ITM', buffer, bifs);

    this.bam = readBufferString(this.file, 0x3a, 8).toLowerCase();

    const extHeadersCount: number = this.file.readUint16LE(0x68);

    if (extHeadersCount > 0) {
      const extHeadersOff: number = this.file.readUint32LE(0x64);

      const attackType: number = this.file.readUInt8(extHeadersOff + 0x0);

      if (attackType === 2) {
        this.pro = proTable[this.file.readUInt16LE(extHeadersOff + 0x2a) as ProTableKey];
      }
    }
  }
}
