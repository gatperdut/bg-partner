import { SchoolShortValue, SchoolValue } from '@tables/school';
import { Buff, BuffData } from '@views/sheet/components/buffs/buff/buff';

export type BuffGroupData = BuffData;

export abstract class BuffGroup extends Buff {
  protected buffGroupData: BuffGroupData;

  constructor(
    duration: number,
    casterLevel: number,
    spellLevel: number,
    school: SchoolValue,
    schoolShort: SchoolShortValue,
  ) {
    super(duration, casterLevel, spellLevel, school, schoolShort);

    this.buffGroupData = {
      ...this.buffData,
    };
  }
}
