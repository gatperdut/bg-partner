import { ResSpl } from '@chitin/res/impl/res-spl';
import { handlers } from '@handlers';
import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';

export class Eff232 extends Eff {
  public resSpl: ResSpl;

  constructor(protected base: bigint, public source: EffSource) {
    super(232, base, source);

    this.resSpl = handlers.chitin.ress.SPL[this.res] as ResSpl;
  }
}
