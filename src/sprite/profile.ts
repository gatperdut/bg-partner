import { handlers } from '@handlers';
import { AlignKey, alignTab, AlignValue } from '@tables/ids/align';
import { class2NumLevels, ClassKey, classTab, ClassValue } from '@tables/ids/class';
import { EaKey, eaTab, EaValue } from '@tables/ids/ea';
import { RaceKey, raceTab, RaceValue } from '@tables/ids/race';

export class Profile {
  public enemyAlly: EaValue;

  public race: RaceValue;

  public klass: ClassValue;

  public levels: number[] = [];

  public alignment: AlignValue;

  constructor(private base: bigint, private derivedTempOffset: bigint) {
    // Empty
  }

  public run(): void {
    this.enemyAlly =
      eaTab[handlers.memread.memReadNumber(this.base + BigInt(0x38), 'UINT8') as EaKey];

    this.race =
      raceTab[handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xa), 'UINT8') as RaceKey];

    const classKey: ClassKey = handlers.memread.memReadNumber(
      this.base + BigInt(0x30 + 0xb),
      'UINT8',
    ) as ClassKey;

    this.klass = classTab[classKey];

    const numLevels: number = class2NumLevels[classKey];

    this.levels.length = 0;

    this.levels.push(
      handlers.memread.memReadNumber(this.derivedTempOffset + BigInt(0x0 + 0x46), 'UINT16'),
    );

    if (numLevels > 1) {
      this.levels.push(
        handlers.memread.memReadNumber(this.derivedTempOffset + BigInt(0x0 + 0x48), 'UINT16'),
      );

      if (numLevels > 2) {
        this.levels.push(
          handlers.memread.memReadNumber(this.derivedTempOffset + BigInt(0x0 + 0x4a), 'UINT16'),
        );
      }
    }

    this.alignment =
      alignTab[
        handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0x17), 'UINT8') as AlignKey
      ];
  }
}
