import { Eff } from './eff';

// Protection_Stoneskin
export class Eff0 extends Eff {
  constructor(public id: number, protected base: bigint) {
    super(id, base);
  }

  public summary(): void {
    super.summary();
  }
}
