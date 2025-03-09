import { EffKey } from '../../tables/eff';
import { EffSource } from './effs';
import { Eff } from './impl/eff';
import { Eff83 } from './impl/eff-83';
import { EffStub } from './impl/eff-stub';

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
