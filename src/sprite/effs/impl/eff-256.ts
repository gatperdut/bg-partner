import { ResSpl } from '@chitin/res/impl/res-spl';
import { handlers } from '@handlers';
import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import _ from 'lodash';

export class Eff256 extends Eff {
  public resSpls: ResSpl[];

  constructor(base: bigint, source: EffSource) {
    super(256, base, source);

    this.resSpls = _.compact([
      handlers.chitin.ress.SPL[this.res] as ResSpl,
      handlers.chitin.ress.SPL[this.res2] as ResSpl,
      handlers.chitin.ress.SPL[this.res3] as ResSpl,
    ]);
  }
}
