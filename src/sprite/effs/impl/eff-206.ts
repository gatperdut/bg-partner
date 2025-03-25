import { ResSpl } from '@chitin/res/impl/res-spl';
import { handlers } from '@handlers';
import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';

export class Eff206 extends Eff {
  public splName: string;

  constructor(base: bigint, source: EffSource) {
    super(206, base, source);

    const hand = handlers;

    const spl: ResSpl = handlers.chitin.ress.SPL[this.res] as ResSpl;

    if (!spl) {
      console.error(`Eff206: SPL ${this.res} not found.`);

      this.loaded = false;

      return;
    }

    this.splName = spl.name;
  }
}
