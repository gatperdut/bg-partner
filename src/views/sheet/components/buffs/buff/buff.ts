import { Component, ComponentData } from '@views/shared/component/component';
import { BuffDuration } from '@views/sheet/components/buffs/parts/buff-duration/buff-duration';
import { BuffLevels } from '@views/sheet/components/buffs/parts/buff-levels/buff-levels';
import { sheetdata } from '@views/sheet/sheetdata';

export type BuffData = ComponentData & {
  levelsHtml: string;
  imageHtml: string;
  durationHtml: string;
  rightHtml: string;
};

export class Buff extends Component {
  protected buffData: BuffData;

  constructor(duration: number, casterLevel: number, spellLevel: number) {
    super();

    this.buffData = {
      ...this.componentData,
      levelsHtml: new BuffLevels(casterLevel, spellLevel).html,
      imageHtml: null,
      durationHtml: new BuffDuration(duration, sheetdata.timetracker.time).html,
      rightHtml: null,
    };
  }
}
