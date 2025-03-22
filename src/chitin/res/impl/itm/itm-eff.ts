import { Bif } from '@chitin/bif';
import { ResEffBase } from '@chitin/res/impl/eff/res-eff-base';
import { EffKey } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { EffsaveKey, EffsaveKeys, effsaveTab } from '@tables/eff/effsave';
import { SchoolKey, schoolShortTab, schoolTab } from '@tables/school';
import _ from 'lodash';

export class ItmEff extends ResEffBase {
  constructor(buffer: Buffer, bifs: Bif[]) {
    super(buffer, bifs);

    this.key = this.file.readInt32LE(0x10) as EffKey;

    this.param1 = this.file.readInt32LE(0x1c);

    this.param2 = this.file.readInt32LE(0x20);

    this.duration = this.file.readInt32LE(0x28);

    this.durtype = this.file.readInt16LE(0x24) as DurtypeKey;

    this.prob1 = this.file.readInt16LE(0x2c);

    this.prob2 = this.file.readInt16LE(0x2e);

    const save = this.file.readInt32LE(0x40);

    _.each(EffsaveKeys, (key: EffsaveKey): boolean => {
      if (save & key) {
        this.save = effsaveTab[key];

        return false;
      }

      return true;
    });

    this.bypassMirrorImage = !!(save & 0x8000000);

    this.saveBonus = this.file.readInt32LE(0x44);

    const schoolKey: SchoolKey = this.file.readInt32LE(0x4c) as SchoolKey;

    this.school = schoolTab[schoolKey];

    this.schoolShort = schoolShortTab[schoolKey];

    this.diceThrown = this.file.readInt32LE(0x38);

    this.diceSides = this.file.readInt32LE(0x3c);

    this.lowestLevel = this.file.readInt32LE(0x54);

    this.highestLevel = this.file.readInt32LE(0x58);
  }
}
