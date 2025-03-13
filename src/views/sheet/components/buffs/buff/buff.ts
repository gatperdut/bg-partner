import { sheetdata } from '../../../../../views/sheet/sheetdata';
import { Component, ComponentData } from '../../component/component';
import { BuffDuration } from '../parts/buff-duration/buff-duration';
import { BuffLevels } from '../parts/buff-levels/buff-levels';

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
