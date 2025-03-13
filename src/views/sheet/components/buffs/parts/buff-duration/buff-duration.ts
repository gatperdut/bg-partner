import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Component, ComponentData } from '../../../component/component';

export type BuffDurationData = ComponentData & {
  duration: number;
};

export class BuffDuration extends Component {
  protected buffDurationData: BuffDurationData;

  constructor(components: ComponentsRecord, duration: number, time: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffDuration);

    this.buffDurationData = {
      title: 'Duration',
      duration: Math.round((duration - time) / 15),
    };

    this.html = compiled(this.buffDurationData);
  }
}
