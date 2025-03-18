import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type SavesData = ComponentData & {
  saveVsDeath: number;
  saveVsWands: number;
  saveVsPoly: number;
  saveVsBreath: number;
  saveVsSpell: number;
};

export class Saves extends Component {
  protected savesData: SavesData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.saves);

    this.savesData = {
      ...this.componentData,
      saveVsDeath: sheetdata.spriteView.derived.saveVsDeath,
      saveVsWands: sheetdata.spriteView.derived.saveVsWands,
      saveVsPoly: sheetdata.spriteView.derived.saveVsPoly,
      saveVsBreath: sheetdata.spriteView.derived.saveVsBreath,
      saveVsSpell: sheetdata.spriteView.derived.saveVsSpell,
    };

    this.html = compiled(this.savesData);
  }
}
