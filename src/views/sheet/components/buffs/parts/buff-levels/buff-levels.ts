import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';

export type BuffLevelsData = {
  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels {
  public html: string;

  constructor(components: ComponentsRecord, eff: Eff) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffLevels);

    const buffLevelsData: BuffLevelsData = {
      casterLevel: eff.casterLevel,
      spellLevel: eff.spellLevel,
    };

    this.html = compiled(buffLevelsData);
  }
}
