import { SchoolShortValue, SchoolValue } from '@tables/school';
import { Component, ComponentData } from '@views/shared/component';
import { BuffDuration } from '@views/sheet/components/buffs/parts/buff-duration/buff-duration';
import { BuffLevels } from '@views/sheet/components/buffs/parts/buff-levels/buff-levels';
import { sheetdata } from '@views/sheet/sheetdata';
import { BuffSchool } from '../parts/buff-school/buff-school';

export type BuffData = ComponentData & {
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
    casterLevel: number,
    spellLevel: number,
    school: SchoolValue,
    schoolShort: SchoolShortValue,
    key: number,
  ) {
    super();

    this.buffData = {
      ...this.componentData,
      levelsHtml: new BuffLevels(casterLevel, spellLevel).html,
      imageHtml: null,
      durationHtml: new BuffDuration(duration, sheetdata.timetracker.time, key).html,
      rightHtml: null,
      schoolHtml: new BuffSchool(school, schoolShort).html,
    };
  }
}
