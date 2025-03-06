import { Eff } from './impl/eff';
import { Eff0 } from './impl/eff-0';
import { Eff218 } from './impl/eff-218';
import { EffStub } from './impl/eff-stub';

// TODO Can this be metaprogrammed?
export class EffFactory {
  public create(id: number, base: bigint): Eff {
    switch (id) {
      case 0:
        return new Eff0(id, base);
      case 159:
        console.log('159!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        return new EffStub(id, base);
      case 218:
        return new Eff218(id, base);
      default:
        return new EffStub(id, base);
    }
  }
}
