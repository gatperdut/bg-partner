import { Effect } from './impl/effect';
import { Effect218 } from './impl/effect-218';
import { EffectStub } from './impl/effect-stub';

// TODO Can this be metaprogrammed?
export class EffectFactory {
  public create(id: number, base: bigint): Effect {
    switch (id) {
      case 218:
        return new Effect218(id, base);
      default:
        return new EffectStub(id, base);
    }
  }
}
