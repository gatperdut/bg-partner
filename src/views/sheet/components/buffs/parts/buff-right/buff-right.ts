import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Component, ComponentData } from '../../../component/component';

export type BuffRightData = ComponentData & {
  value: number;
};

export class BuffRight extends Component {
  protected buffRightData: BuffRightData;

  constructor(components: ComponentsRecord, value: number, title: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffRight);

    this.buffRightData = {
      ...this.componentData,
      value: value,
      title: title,
    };

    this.html = compiled(this.buffRightData);
  }
}
