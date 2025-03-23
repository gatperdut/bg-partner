import { HitBase } from '@chitin/res/impl/hit/hit-base';
import { EffKey } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { EffsaveKey, EffsaveKeys, effsaveTab } from '@tables/eff/effsave';
import { SchoolKey, schoolShortTab, schoolTab } from '@tables/school';
import { readBufferString } from '@utils';
import _ from 'lodash';

export class ResEffHit extends HitBase {
  constructor(buf: Buffer) {
    super();

    this.key = buf.readInt32LE(0x10) as EffKey;

    this.param1 = buf.readInt32LE(0x1c);

    this.param2 = buf.readInt32LE(0x20);

    this.resource = readBufferString(buf, 0x30, 8).toLowerCase();

    this.duration = buf.readInt32LE(0x28);

    this.durtype = buf.readInt16LE(0x24) as DurtypeKey;

    this.prob1 = buf.readInt16LE(0x2c);

    this.prob2 = buf.readInt16LE(0x2e);

    const save = buf.readInt32LE(0x40);

    _.each(EffsaveKeys, (key: EffsaveKey): boolean => {
      if (save & key) {
        this.save = effsaveTab[key];

        return false;
      }

      return true;
    });

    this.bypassMirrorImage = !!(save & 0x800000);

    this.saveBonus = buf.readInt32LE(0x44);

    const schoolKey: SchoolKey = buf.readInt32LE(0x4c) as SchoolKey;

    this.school = schoolTab[schoolKey];

    this.schoolShort = schoolShortTab[schoolKey];

    this.lowestLevel = buf.readInt32LE(0x54);

    this.highestLevel = buf.readInt32LE(0x58);

    this.diceThrown = buf.readInt32LE(0x38);

    this.diceSides = buf.readInt32LE(0x3c);
  }
}
