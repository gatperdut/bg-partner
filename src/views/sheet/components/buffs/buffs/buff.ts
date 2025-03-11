import { Eff } from '../../../../../sprite/effs/impl/eff';

export type BuffData = {
  eff: Eff;

  duration: number;

  valign: number;
};

export class Buff {
  protected buffData: BuffData;

  constructor(eff: Eff, time: number) {
    this.buffData = {
      eff: eff,
      duration: Math.round((eff.duration - time) / 15),
      valign: Math.floor((32 - eff.resImage.size.height) / 2),
    };
  }
}
