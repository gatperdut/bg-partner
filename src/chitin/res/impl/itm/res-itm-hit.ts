import { HitBase } from '@chitin/res/impl/hit/hit-base';
import { EffKey } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { EffsaveKey, EffsaveKeys, effsaveTab } from '@tables/eff/effsave';
import { SchoolKey, schoolShortTab, schoolTab } from '@tables/school';
import _ from 'lodash';

export class ResItmHit extends HitBase {
  constructor(extheaderBuf: Buffer, buf: Buffer) {
    super();

    this.key = buf.readInt16LE(0x0) as EffKey;

    this.param1 = buf.readInt32LE(0x4);

    this.param2 = buf.readInt32LE(0x8);

    this.duration = buf.readInt32LE(0xe);

    this.durtype = buf.readUint8(0xc) as DurtypeKey;

    this.prob1 = buf.readUint8(0x12);

    this.prob2 = buf.readUint8(0x13);

    const save = buf.readInt32LE(0x24);

    _.each(EffsaveKeys, (key: EffsaveKey): boolean => {
      if (save & key) {
        this.save = effsaveTab[key];

        return false;
      }

      return true;
    });

    this.bypassMirrorImage = !!(save & 0x800000);

    this.saveBonus = buf.readInt32LE(0x28);

    const schoolKey: SchoolKey = extheaderBuf.readInt8(0x17) as SchoolKey;

    this.school = schoolTab[schoolKey];

    this.schoolShort = schoolShortTab[schoolKey];

    this.lowestLevel = buf.readInt32LE(0x1c);

    this.highestLevel = buf.readInt32LE(0x20);
  }
}
