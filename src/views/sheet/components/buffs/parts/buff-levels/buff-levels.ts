import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';

export type BuffLevelsData = {
  valign: number;

  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels {
  public html: string;

  constructor(components: ComponentsRecord, valign: number, eff: Eff) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffLevels);

    const buffLevelsData: BuffLevelsData = {
      valign: valign,
      casterLevel: eff.casterLevel,
      spellLevel: eff.spellLevel,
    };

    this.html = compiled(buffLevelsData);
  }
}
