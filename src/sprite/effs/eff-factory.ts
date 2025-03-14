import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { Eff83 } from '@sprite/effs/impl/eff-83';
import { EffStub } from '@sprite/effs/impl/eff-stub';
import { EffKey } from '@tables/eff';

export class EffFactory {
  public static create(id: EffKey, base: bigint, source: EffSource): Eff {
    switch (id) {
      case 83:
        return new Eff83(base, source);
      default:
        return new EffStub(id, base, source);
    }
  }
}
