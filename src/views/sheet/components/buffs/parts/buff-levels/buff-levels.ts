import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';

export type BuffLevelsData = {
  valign: number;

  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels {
  public html: string;

  constructor(
    components: ComponentsRecord,
    valign: number,
    casterLevel: number,
    spellLevel: number
  ) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffLevels);

    const buffLevelsData: BuffLevelsData = {
      valign: valign,
      casterLevel: casterLevel,
      spellLevel: spellLevel,
    };

    this.html = compiled(buffLevelsData);
  }
}
