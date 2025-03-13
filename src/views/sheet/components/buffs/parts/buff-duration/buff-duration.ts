import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { Component, ComponentData } from '../../../component/component';

export type BuffDurationData = ComponentData & {
  duration: number;
};

export class BuffDuration extends Component {
  constructor(components: ComponentsRecord, eff: Eff, time: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffDuration);

    const duration: number = Math.round((eff.duration - time) / 15);

    const buffDurationData: BuffDurationData = {
      title: 'Duration',
      duration: duration,
    };

    this.html = compiled(buffDurationData);
  }
}
