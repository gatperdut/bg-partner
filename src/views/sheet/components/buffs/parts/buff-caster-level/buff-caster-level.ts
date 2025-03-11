import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';

export type BuffCasterLevelData = {
  valign: number;

  casterLevel: number;
};

export class BuffCasterLevel {
  public html: string;

  constructor(components: ComponentsRecord, valign: number, casterLevel: number) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffCasterLevel);

    const buffCasterLevelData: BuffCasterLevelData = {
      valign: valign,
      casterLevel: casterLevel,
    };

    this.html = compiled(buffCasterLevelData);
  }
}
