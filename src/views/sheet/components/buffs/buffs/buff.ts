import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { BuffDuration } from '../parts/buff-duration/buff-duration';
import { BuffImage } from '../parts/buff-image/buff-image';
import { BuffLevels } from '../parts/buff-levels/buff-levels';

export type BuffData = {
  eff: Eff;

  valign: number;

  levelsHtml: string;

  imageHtml: string;

  durationHtml: string;
};

export class Buff {
  protected buffData: BuffData;

  constructor(components: ComponentsRecord, eff: Eff, time: number) {
    const valign: number = Math.floor((32 - eff.resImage.size.height) / 2);

    this.buffData = {
      eff: eff,
      valign: valign,
      levelsHtml: new BuffLevels(components, valign, eff).html,
      imageHtml: new BuffImage(components, eff).html,
      durationHtml: new BuffDuration(components, eff, time).html,
    };
  }
}
