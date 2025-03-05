import { Eff } from './eff';

export class EffStub extends Eff {
  constructor(public id: number, protected base: bigint) {
    super(id, base);
  }

  public summary(): void {
    super.summary();
  }
}
