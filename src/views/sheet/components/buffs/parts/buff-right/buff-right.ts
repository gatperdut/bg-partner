import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';

export type BuffRightData = {
  value: number;

  tooltip: string;
};

export class BuffRight {
  public html: string;

  constructor(components: ComponentsRecord, value: number, tooltip: string) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffRight);

    const buffRightData: BuffRightData = {
      value: value,
      tooltip: tooltip,
    };

    this.html = compiled(buffRightData);
  }
}
