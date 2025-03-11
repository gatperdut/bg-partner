import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { BuffCasterLevel } from '../parts/buff-caster-level/buff-caster-level';
import { BuffDuration } from '../parts/buff-duration/buff-duration';

export type BuffData = {
  eff: Eff;

  duration: number;

  valign: number;

  casterLevelHtml: string;

  durationHtml: string;
};

export class Buff {
  protected buffData: BuffData;

  constructor(components: ComponentsRecord, eff: Eff, time: number) {
    const valign: number = Math.floor((32 - eff.resImage.size.height) / 2);

    const duration: number = Math.round((eff.duration - time) / 15);
    // TODO remove duration
    this.buffData = {
      eff: eff,
      valign: valign,
      duration: duration,
      casterLevelHtml: new BuffCasterLevel(components, valign, eff.casterLevel).html,
      durationHtml: new BuffDuration(components, valign, duration).html,
    };
  }
}
