import { ResSpl } from '@chitin/res/impl/res-spl';
import { Component, ComponentData } from '@views/shared/component';
import { Spell } from '@views/sheet/components/spells/spell/spell';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type SpellsData = ComponentData & {
  spellHtmls: string[];
};

export class Spells extends Component {
  protected spellsData: SpellsData;

  constructor(resSpls: ResSpl[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.spells);

    this.spellsData = {
      ...this.componentData,
      spellHtmls: _.map(resSpls, (resSpl: ResSpl): string => new Spell(resSpl).html),
    };

    this.html = compiled(this.spellsData);
  }
}
