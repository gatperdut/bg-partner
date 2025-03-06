import { Eff } from './impl/eff';
import { Eff0 } from './impl/eff-0';
import { Eff159 } from './impl/eff-159';
import { Eff218 } from './impl/eff-218';
import { EffStub } from './impl/eff-stub';

// TODO Can this be metaprogrammed?
export class EffFactory {
  public create(id: number, base: bigint): Eff {
    switch (id) {
      case 0:
        return new Eff0(base);
      case 159:
        return new Eff159(base);
      case 218:
        return new Eff218(base);
      default:
        return new EffStub(id, base);
    }
  }
}
