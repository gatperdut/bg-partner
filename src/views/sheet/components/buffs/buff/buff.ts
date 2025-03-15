import { EffKey, EffValue } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { SchoolShortValue, SchoolValue } from '@tables/school';
import { Component, ComponentData } from '@views/shared/component';
import { BuffDuration } from '@views/sheet/components/buffs/parts/buff-duration/buff-duration';
import { BuffKey } from '@views/sheet/components/buffs/parts/buff-key/buff-key';
import { BuffLevels } from '@views/sheet/components/buffs/parts/buff-levels/buff-levels';
import { sheetdata } from '@views/sheet/sheetdata';
import { BuffSchool } from '../parts/buff-school/buff-school';

export type BuffData = ComponentData & {
  keyHtml: string;
  levelsHtml: string;
  imageHtml: string;
  durationHtml: string;
  rightHtml: string;
  schoolHtml: string;
};

export abstract class Buff extends Component {
  protected buffData: BuffData;

  constructor(
    duration: number,
    durtype: DurtypeKey,
    casterLevel: number,
    spellLevel: number,
    school: SchoolValue,
    schoolShort: SchoolShortValue,
    effKey: EffKey,
    effValue: EffValue,
  ) {
    super();

    this.buffData = {
      ...this.componentData,
      keyHtml: new BuffKey(effKey, effValue).html,
      levelsHtml: new BuffLevels(casterLevel, spellLevel).html,
      imageHtml: null,
      durationHtml: new BuffDuration(duration, durtype, sheetdata.timetracker.time, effKey).html,
      rightHtml: null,
      schoolHtml: new BuffSchool(school, schoolShort).html,
    };
  }
}
