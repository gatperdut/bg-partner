import { Bif } from '@chitin/bif';
import { ResImage } from '@chitin/res/res-image';
import { ProKey, ProValue, proTab } from '@tables/pro';
import { handlers } from 'src/handlers';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResItm extends Res {
  public name: string;

  public desc: string;

  private bamCode: string;

  public resImage: ResImage;

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

  public resImageSet(): void {
    if (!this.bamCode) {
      return;
    }

    const resImage: ResImage = new ResImage(this.bamCode);

    if (!resImage.loaded) {
      return;
    }

    this.resImage = resImage;
  }
}
