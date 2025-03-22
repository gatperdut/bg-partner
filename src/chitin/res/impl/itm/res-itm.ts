import { Bif } from '@chitin/bif';
import { ResImage } from '@chitin/res/image/res-image';
import { ResItmHit } from '@chitin/res/impl/itm/res-itm-hit';
import { Res } from '@chitin/res/impl/res';
import { handlers } from '@handlers';
import { Effs } from '@sprite/effs/effs';
import { ProKey, ProValue, proTab } from '@tables/pro';
import { readBufferString } from '@utils';
import _ from 'lodash';

export class ResItm extends Res {
  public name: string;

  public desc: string;

  private bamCode: string;

  public resImage: ResImage;

  public proValues: ProValue[] = [];

  public enchantment: number;

  public resItmHitsMelee: ResItmHit[] = [];

  public resItmHitsRanged: ResItmHit[] = [];

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

  private header(extheaderBuf: Buffer): void {
    const attackType: number = extheaderBuf.readUInt8(0x0);

    let target: ResItmHit[];

    switch (attackType) {
      case 1:
        target = this.resItmHitsMelee;

        break;
      case 2:
        target = this.resItmHitsRanged;

        if (this.enchantment === 0) {
          this.proValues.push(proTab[extheaderBuf.readUInt16LE(0x2a) as ProKey]);
        }

        break;
      default:
    }

    if (!target) {
      return;
    }

    const featsOffset: number = this.file.readUint32LE(0x6a);

    const featsCount: number = extheaderBuf.readUInt16LE(0x1e);

    const featsIndex: number = extheaderBuf.readUint16LE(0x20);

    for (let i: number = 0; i < featsCount; i++) {
      const resItmHit: ResItmHit = new ResItmHit(
        extheaderBuf,
        this.file.subarray(featsOffset + (i + featsIndex) * 48, this.file.length),
      );

      if (_.includes(Effs.effsIgnored, resItmHit.key)) {
        continue;
      }

      target.push(resItmHit);
    }
  }
}
