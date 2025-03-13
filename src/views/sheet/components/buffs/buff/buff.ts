import { ComponentsRecord } from '../../../../../components/components';
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

  constructor(
    components: ComponentsRecord,
    duration: number,
    casterLevel: number,
    spellLevel: number,
    time: number
  ) {
    super();

    this.buffData = {
      ...this.componentData,
      levelsHtml: new BuffLevels(components, casterLevel, spellLevel).html,
      imageHtml: null,
      durationHtml: new BuffDuration(components, duration, time).html,
      rightHtml: null,
    };
  }
}
