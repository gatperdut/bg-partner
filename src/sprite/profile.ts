import { handlers } from '@handlers';
import { ClassKey, classTab, ClassValue } from '@tables/ids/class';
import { EaKey, eaTab, EaValue } from '@tables/ids/ea';
import { RaceKey, raceTab, RaceValue } from '@tables/ids/race';

export class Profile {
  public enemyAlly: EaValue;

  public race: RaceValue;

  public class: ClassValue;

  public levels: number[] = [];

  constructor(private base: bigint, private derivedTempOffset: bigint) {
    // Empty
  }

  public run(): void {
    this.enemyAlly =
      eaTab[handlers.memread.memReadNumber(this.base + BigInt(0x38), 'BYTE') as EaKey];

    this.race =
      raceTab[handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xa), 'BYTE') as RaceKey];

    this.class =
      classTab[handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xb), 'BYTE') as ClassKey];

    this.levels.push(
      handlers.memread.memReadNumber(this.derivedTempOffset + BigInt(0x0 + 0x46), 'UINT16'),
    );

    this.levels.push(
      handlers.memread.memReadNumber(this.derivedTempOffset + BigInt(0x0 + 0x48), 'UINT16'),
    );

    this.levels.push(
      handlers.memread.memReadNumber(this.derivedTempOffset + BigInt(0x0 + 0x4a), 'UINT16'),
    );
  }
}
