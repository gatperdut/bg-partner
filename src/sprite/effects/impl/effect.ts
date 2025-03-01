import { effectTable } from '../../../tables/effect';

export abstract class Effect {
  constructor(public id: number, protected base: bigint) {
    // Empty
  }

  public summary(): void {
    console.log(effectTable[this.id]);
  }
}
