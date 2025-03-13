import Handlebars from 'handlebars';
import { sheetdata } from '../../../../../../views/sheet/sheetdata';
import { Component, ComponentData } from '../../../component/component';

export type BuffDurationData = ComponentData & {
  duration: number;
};

export class BuffDuration extends Component {
  protected buffDurationData: BuffDurationData;

  constructor(duration: number, time: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffDuration
    );

    this.buffDurationData = {
      ...this.componentData,
      title: 'Duration',
      duration: Math.round((duration - time) / 15),
    };

    this.html = compiled(this.buffDurationData);
  }
}
