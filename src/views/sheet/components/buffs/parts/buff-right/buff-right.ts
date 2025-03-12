import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';

export type BuffRightData = {
  value: number;
};

export class BuffLevels {
  public html: string;

  constructor(components: ComponentsRecord, value: number) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffRight);

    const buffRightData: BuffRightData = {
      value: value,
    };

    this.html = compiled(buffRightData);
  }
}
