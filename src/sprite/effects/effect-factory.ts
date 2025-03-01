import { Effect } from './impl/effect';
import { EffectStub } from './impl/effect-stub';

export class EffectFactory {
  public create(id: number, base: bigint): Effect {
    return new EffectStub(id, base);
  }
}
