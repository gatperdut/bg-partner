import { Eff } from './eff';

// Stat_AC_vs_Damage_Type_Modifier
export class Eff0 extends Eff {
  constructor(protected base: bigint) {
    super(0, base);
  }

  public summary(): void {
    super.summary();
  }
}
