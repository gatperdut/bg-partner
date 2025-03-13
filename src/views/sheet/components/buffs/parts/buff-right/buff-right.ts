import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Component, ComponentData } from '../../../component/component';

export type BuffRightData = ComponentData & {
  value: number;
};

export class BuffRight extends Component {
  constructor(components: ComponentsRecord, value: number, title: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffRight);

    const buffRightData: BuffRightData = {
      value: value,
      title: title,
    };

    this.html = compiled(buffRightData);
  }
}
