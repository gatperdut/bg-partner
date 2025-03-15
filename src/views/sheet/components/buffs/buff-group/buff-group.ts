import { DurtypeKey } from '@tables/eff/durtype';
import { SchoolShortValue, SchoolValue } from '@tables/school';
import { Buff, BuffData } from '@views/sheet/components/buffs/buff/buff';

export type BuffGroupData = BuffData;

export abstract class BuffGroup extends Buff {
  protected buffGroupData: BuffGroupData;

  constructor(
    duration: number,
    durtype: DurtypeKey,
    casterLevel: number,
    spellLevel: number,
    school: SchoolValue,
    schoolShort: SchoolShortValue,
    key: number,
  ) {
    super(duration, durtype, casterLevel, spellLevel, school, schoolShort, key);

    this.buffGroupData = {
      ...this.buffData,
    };
  }
}
