import { ResSpl } from '@chitin/res/impl/res-spl';
import { handlers } from '@handlers';
import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import _ from 'lodash';

export class Eff232 extends Eff {
  public resSpls: ResSpl[];

  constructor(protected base: bigint, public source: EffSource) {
    super(232, base, source);

    this.resSpls = _.compact([
      handlers.chitin.ress.SPL[this.res] as ResSpl,
      handlers.chitin.ress.SPL[this.res2] as ResSpl,
      handlers.chitin.ress.SPL[this.res3] as ResSpl,
    ]);
  }
}
