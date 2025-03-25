import { handlers } from '@handlers';
import { AlignKey, alignTab, AlignValue } from '@tables/ids/align';
import { class2NumLevels, ClassKey, classTab, ClassValue } from '@tables/ids/class';
import { EaKey, eaTab, EaValue } from '@tables/ids/ea';
import { GenderKey, genderTab, GenderValue } from '@tables/ids/gender';
import { GeneralKey, generalTab, GeneralValue } from '@tables/ids/general';
import { KitKey, kitTab, KitValue } from '@tables/ids/kit';
import { RaceKey, raceTab, RaceValue } from '@tables/ids/race';
import { SpecificKey, specificTab, SpecificValue } from '@tables/ids/specific';

export class Profile {
  public enemyAlly: EaValue;

  public general: GeneralValue;

  public specific: SpecificValue;

  public gender: GenderValue;

  public race: RaceValue;

  public hatedRace: RaceValue;

  public klass: ClassValue;

  public kit: KitValue;

  public levels: number[] = [];

  public alignment: AlignValue;

  constructor(private base: bigint, private derivedTempOffset: bigint) {
    // Empty
  }

  public run(): void {
    this.enemyAlly =
      eaTab[handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0x8), 'UINT8') as EaKey];

    this.general =
      generalTab[
        handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0x9), 'UINT8') as GeneralKey
      ];

    this.specific =
      specificTab[
        handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0x15), 'UINT8') as SpecificKey
      ];

    this.gender =
      genderTab[
        handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0x16), 'UINT8') as GenderKey
      ];

    this.race =
      raceTab[handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xa), 'UINT8') as RaceKey];

    this.hatedRace =
      raceTab[
        handlers.memread.memReadNumber(this.base + BigInt(0x560 + 0x239), 'UINT8') as RaceKey
      ];

    const classKey: ClassKey = handlers.memread.memReadNumber(
      this.base + BigInt(0x30 + 0xb),
      'UINT8',
    ) as ClassKey;

    this.klass = classTab[classKey];

    const hand = handlers;

    this.kit =
      kitTab[
        handlers.memread.memReadNumber(
          this.derivedTempOffset + BigInt(0x0 + 0x224),
          'UINT32',
        ) as KitKey
      ];

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
