import { Bif } from '@chitin/bif';
import { ResImage } from '@chitin/res/image/res-image';
import { Res } from '@chitin/res/impl/res';
import { handlers } from '@handlers';
import { ProKey, ProValue, proTab } from '@tables/pro';
import { readBufferString } from '@utils';

export class ResItm extends Res {
  public name: string;

  public desc: string;

  private bamCode: string;

  public resImage: ResImage;

  public proValues: ProValue[] = [];

  public enchantment: number;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('ITM', buffer, bifs);

    this.name = handlers.tlk.tlks[this.file.readUint32LE(0xc)];

    this.desc = handlers.tlk.tlks[this.file.readUint32LE(0x54)];

    this.bamCode = readBufferString(this.file, 0x3a, 8).toLowerCase();

    this.enchantment = this.file.readUint32LE(0x60);

    const extHeadersCount: number = this.file.readUint16LE(0x68);

    const extHeadersOffset: number = this.file.readUint32LE(0x64);

    for (let i: number = 0; i < extHeadersCount; i++) {
      this.header(this.file.subarray(extHeadersOffset + 56 * i, this.file.length));
    }
  }

  public resImageSet(): void {
    if (!this.bamCode) {
      this.resImage = handlers.chitin.resImageDefault;

      return;
    }

    let resImage: ResImage = new ResImage(this.bamCode);

    if (!resImage.loaded) {
      resImage = handlers.chitin.resImageDefault;
    }

    this.resImage = resImage;
  }

  private header(buf: Buffer): void {
    const attackType: number = buf.readUInt8(0x0);

    const featsCount: number = buf.readUInt16LE(0x1e);

    const featsOffset: number = buf.readUint16LE(0x20);

    switch (attackType) {
      case 1:
        break;
      case 2:
        if (this.enchantment === 0) {
          this.proValues.push(proTab[buf.readUInt16LE(0x2a) as ProKey]);
        }

        break;
      default:
    }
  }
}
