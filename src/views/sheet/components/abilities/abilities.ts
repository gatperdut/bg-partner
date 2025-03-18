import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type AbilitiesData = ComponentData & {
  str: string;

  dex: number;

  con: number;

  int: number;

  wis: number;

  cha: number;
};

export class Abilities extends Component {
  protected abilitiesData: AbilitiesData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.abilities);

    const strStr: string =
      sheetdata.spriteView.derived.str +
      (sheetdata.spriteView.derived.strExc ? `/${sheetdata.spriteView.derived.strExc}` : '');

    this.abilitiesData = {
      ...this.componentData,
      str: strStr,
      dex: sheetdata.spriteView.derived.dex,
      con: sheetdata.spriteView.derived.con,
      int: sheetdata.spriteView.derived.int,
      wis: sheetdata.spriteView.derived.wis,
      cha: sheetdata.spriteView.derived.cha,
    };

    this.html = compiled(this.abilitiesData);
  }
}
