import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { Component } from '../../component/component';
import { BuffDuration } from '../parts/buff-duration/buff-duration';
import { BuffLevels } from '../parts/buff-levels/buff-levels';

export type BuffData = {
  eff: Eff;

  valign: number;

  levelsHtml: string;

  imageHtml: string;

  durationHtml: string;
};

export class Buff extends Component {
  protected buffData: BuffData;

  constructor(components: ComponentsRecord, eff: Eff, time: number) {
    super();

    const valign: number = Math.floor((32 - eff.resImage.size.height) / 2);

    this.buffData = {
      eff: eff,
      valign: valign,
      levelsHtml: new BuffLevels(components, eff).html,
      imageHtml: null,
      durationHtml: new BuffDuration(components, eff, time).html,
    };
  }
}
