import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { Component } from '../../../component/component';

export type BuffLevelsData = {
  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels extends Component {
  constructor(components: ComponentsRecord, eff: Eff) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffLevels);

    const buffLevelsData: BuffLevelsData = {
      casterLevel: eff.casterLevel,
      spellLevel: eff.spellLevel,
    };

    this.html = compiled(buffLevelsData);
  }
}
