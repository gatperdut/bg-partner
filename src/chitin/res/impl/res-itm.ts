import { Bif } from '../../../chitin/bif';
import { handlers } from '../../../handlers';
import { Image } from '../../../sprite/effs/eff-image';
import { ProKey, proTab, ProValue } from '../../../tables/pro';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResItm extends Res {
  public name: string;

  public desc: string;

  public image: Image;

  public bamCode: string;

  public proValues: ProValue[] = [];

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('ITM', buffer, bifs);

    this.name = handlers.tlk.tlks[this.file.readUint16LE(0xc)];

    this.desc = handlers.tlk.tlks[this.file.readUint16LE(0x54)];

    this.bamCode = readBufferString(this.file, 0x3a, 8).toLowerCase();

    const enchantment: number = this.file.readUint32LE(0x60);

    if (enchantment > 0) {
      return;
    }

    const extHeadersCount: number = this.file.readUint16LE(0x68);

    const extHeadersOff: number = this.file.readUint32LE(0x64);

    for (let i: number = 0; i < extHeadersCount; i++) {
      const attackType: number = this.file.readUInt8(extHeadersOff + 56 * i + 0x0);

      if (attackType === 2) {
        this.proValues.push(
          proTab[this.file.readUInt16LE(extHeadersOff + 56 * i + 0x2a) as ProKey]
        );
      }
    }
  }
}
