import { Eff } from './impl/eff';
import { Eff218 } from './impl/eff-218';
import { EffStub } from './impl/eff-stub';

// TODO Can this be metaprogrammed?
export class EffFactory {
  public create(id: number, base: bigint): Eff {
    switch (id) {
      case 218:
        return new Eff218(id, base);
      default:
        return new EffStub(id, base);
    }
  }
}
