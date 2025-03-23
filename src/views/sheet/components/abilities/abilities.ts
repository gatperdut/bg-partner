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
      sheetdata.sprite.derived.str +
      (sheetdata.sprite.derived.strExc ? `/${sheetdata.sprite.derived.strExc}` : '');

    this.abilitiesData = {
      ...this.componentData,
      str: strStr,
      dex: sheetdata.sprite.derived.dex,
      con: sheetdata.sprite.derived.con,
      int: sheetdata.sprite.derived.int,
      wis: sheetdata.sprite.derived.wis,
      cha: sheetdata.sprite.derived.cha,
    };

    this.html = compiled(this.abilitiesData);
  }
}
