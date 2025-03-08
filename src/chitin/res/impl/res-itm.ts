import { Bif } from '../../../chitin/bif';
import { ProKey, proTab, ProValue } from '../../../tables/pro';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResItm extends Res {
  public bam: string;

  public proValues: ProValue[] = [];

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('ITM', buffer, bifs);

    this.bam = readBufferString(this.file, 0x3a, 8).toLowerCase();

    const extHeadersCount: number = this.file.readUint16LE(0x68);

    const extHeadersOff: number = this.file.readUint32LE(0x64);

    for (let i: number = 0; i < extHeadersCount; i++) {
      const attackType: number = this.file.readUInt8(extHeadersOff + 0x0);

      if (attackType === 2) {
        this.proValues.push(
          proTab[this.file.readUInt16LE(extHeadersOff + 0x2a + 56 * i) as ProKey]
        );
      }
    }
  }
}
