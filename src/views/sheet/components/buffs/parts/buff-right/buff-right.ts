import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffRightData = ComponentData & {
  value: string;
};

export class BuffRight extends Component {
  protected buffRightData: BuffRightData;

  constructor(value: string, title: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffRight);

    this.buffRightData = {
      ...this.componentData,
      value: value,
      title: title,
    };

    this.html = compiled(this.buffRightData);
  }
}
