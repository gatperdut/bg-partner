import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { Component, ComponentData } from '../../component/component';
import { BuffDuration } from '../parts/buff-duration/buff-duration';
import { BuffLevels } from '../parts/buff-levels/buff-levels';

export type BuffData = ComponentData & {
  eff: Eff;

  levelsHtml: string;

  imageHtml: string;

  durationHtml: string;
};

export class Buff extends Component {
  protected buffData: BuffData;

  constructor(components: ComponentsRecord, eff: Eff, time: number) {
    super();

    this.buffData = {
      title: null,
      eff: eff,
      levelsHtml: new BuffLevels(components, eff).html,
      imageHtml: null,
      durationHtml: new BuffDuration(components, eff, time).html,
    };
  }
}
