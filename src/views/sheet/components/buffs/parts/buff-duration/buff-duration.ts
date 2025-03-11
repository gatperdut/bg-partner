import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';

export type BuffDurationData = {
  valign: number;

  duration: number;
};

export class BuffDuration {
  public html: string;

  constructor(components: ComponentsRecord, valign: number, duration: number) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffDuration);

    const buffDurationData: BuffDurationData = {
      valign: valign,
      duration: duration,
    };

    this.html = compiled(buffDurationData);
  }
}
