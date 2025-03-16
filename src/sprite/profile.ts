import { handlers } from '@handlers';
import { EaKey, eaTab, EaValue } from '@tables/ids/ea';
import { RaceKey, raceTab, RaceValue } from '@tables/ids/race';

export class Profile {
  public enemyAlly: EaValue;

  public race: RaceValue;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.enemyAlly =
      eaTab[handlers.memread.memReadNumber(this.base + BigInt(0x38), 'BYTE') as EaKey];

    this.race =
      raceTab[handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xa), 'BYTE') as RaceKey];
  }
}
