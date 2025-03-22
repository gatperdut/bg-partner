import { ResEff } from '@chitin/res/impl/eff/res-eff';
import { handlers } from '@handlers';
import { Effs, EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import _ from 'lodash';

export class EffHit extends Eff {
  public resEff: ResEff;

  constructor(key: EffKey, base: bigint, source: EffSource) {
    super(key, base, source);

    this.resEff = handlers.chitin.ress.EFF[this.res] as ResEff;

    if (!this.resEff || _.includes(Effs.effsIgnored, this.resEff.resEffHit.key)) {
      this.loaded = false;
    }
  }
}
