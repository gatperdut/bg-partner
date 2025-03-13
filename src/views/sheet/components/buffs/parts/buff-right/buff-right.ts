import Handlebars from 'handlebars';
import { sheetdata } from '../../../../../../views/sheet/sheetdata';
import { Component, ComponentData } from '../../../component/component';

export type BuffRightData = ComponentData & {
  value: number;
};

export class BuffRight extends Component {
  protected buffRightData: BuffRightData;

  constructor(value: number, title: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.components.buffRight);

    this.buffRightData = {
      ...this.componentData,
      value: value,
      title: title,
    };

    this.html = compiled(this.buffRightData);
  }
}
