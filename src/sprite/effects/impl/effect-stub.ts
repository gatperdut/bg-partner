import { Effect } from './effect';

export class EffectStub extends Effect {
  constructor(public id: number, protected base: bigint) {
    super(id, base);
  }

  public summary(): void {
    super.summary();
  }
}
