import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffDurationData = ComponentData & {
  duration: number;

  combi: string;
};

export class BuffDuration extends Component {
  protected buffDurationData: BuffDurationData;

  constructor(duration: number, time: number, key: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffDuration);

    const durationS: number = Math.round((duration - time) / 15);

    this.buffDurationData = {
      ...this.componentData,
      title: 'Duration',
      duration: durationS,
      combi: `${durationS}_${key}`,
    };

    this.html = compiled(this.buffDurationData);
  }
}
