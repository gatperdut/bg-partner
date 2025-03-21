import { Bif } from '@chitin/bif';
import { Res } from '@chitin/res/impl/res';
import { EffKey } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import {
  SchoolKey,
  schoolShortTab,
  SchoolShortValue,
  schoolTab,
  SchoolValue,
} from '@tables/school';

export class ResEff extends Res {
  public key: EffKey;

  public param1: number;

  public param2: number;

  public duration: number;

  public durtype: DurtypeKey;

  public prob1: number;

  public prob2: number;

  public saveType: number;

  public saveBonus: number;

  public school: SchoolValue;

  public schoolShort: SchoolShortValue;

  public diceThrown: number;

  public diceSides: number;

  public lowest: number;

  public highest: number;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('EFF', buffer, bifs);

    this.key = this.file.readInt32LE(0x10) as EffKey;

    this.param1 = this.file.readInt32LE(0x1c);

    this.param2 = this.file.readInt32LE(0x20);

    this.duration = this.file.readInt32LE(0x28);

    this.durtype = this.file.readInt16LE(0x24) as DurtypeKey;

    this.prob1 = this.file.readInt16LE(0x2c);

    this.prob2 = this.file.readInt16LE(0x2e);

    this.saveType = this.file.readInt32LE(0x40);

    this.saveBonus = this.file.readInt32LE(0x44);

    const schoolKey: SchoolKey = this.file.readInt32LE(0x4c) as SchoolKey;

    this.school = schoolTab[schoolKey];

    this.schoolShort = schoolShortTab[schoolKey];

    this.diceThrown = this.file.readInt32LE(0x38);

    this.diceSides = this.file.readInt32LE(0x3c);

    this.lowest = this.file.readInt32LE(0x54);

    this.highest = this.file.readInt32LE(0x58);
  }
}
