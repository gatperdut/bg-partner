import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type ProfsData = ComponentData & {
  saveVsDeath: number;
  saveVsWands: number;
  saveVsPoly: number;
  saveVsBreath: number;
  saveVsSpell: number;
};

export class Profs extends Component {
  protected profsData: ProfsData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.profs);

    this.profsData = {
      ...this.componentData,
      saveVsDeath: sheetdata.spriteView.derived.saveVsDeath,
      saveVsWands: sheetdata.spriteView.derived.saveVsWands,
      saveVsPoly: sheetdata.spriteView.derived.saveVsPoly,
      saveVsBreath: sheetdata.spriteView.derived.saveVsBreath,
      saveVsSpell: sheetdata.spriteView.derived.saveVsSpell,
    };

    this.html = compiled(this.profsData);
  }
}
