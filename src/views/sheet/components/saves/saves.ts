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

  constructor(
    saveVsDeath: number,
    saveVsWands: number,
    saveVsPoly: number,
    saveVsBreath: number,
    saveVsSpell: number,
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.saves);

    this.savesData = {
      ...this.componentData,
      saveVsDeath: saveVsDeath,
      saveVsWands: saveVsWands,
      saveVsPoly: saveVsPoly,
      saveVsBreath: saveVsBreath,
      saveVsSpell: saveVsSpell,
    };

    this.html = compiled(this.savesData);
  }
}
