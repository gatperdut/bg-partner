import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { Eff206 } from '@sprite/effs/impl/eff-206';
import { Eff232 } from '@sprite/effs/impl/eff-232';
import { Eff256 } from '@sprite/effs/impl/eff-256';
import { Eff83 } from '@sprite/effs/impl/eff-83';
import { EffStub } from '@sprite/effs/impl/eff-stub';
import { EffKey } from '@tables/eff';

export class EffFactory {
  public static create(id: EffKey, base: bigint, source: EffSource): Eff {
    switch (id) {
      case 83:
        return new Eff83(base, source);
      case 206:
        return new Eff206(base, source);
      case 232:
        return new Eff232(base, source);
      case 256:
        return new Eff256(base, source);
      default:
        return new EffStub(id, base, source);
    }
  }
}
