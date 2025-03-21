import { ResSpl } from '@chitin/res/impl/res-spl';
import { handlers } from '@handlers';
import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';

export class Eff206 extends Eff {
  public splName: string;

  constructor(base: bigint, source: EffSource) {
    super(206, base, source);

    this.splName = (handlers.chitin.ress.SPL[this.res] as ResSpl).name;
  }
}
