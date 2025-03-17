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

  constructor(
    str: number,
    strExc: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.abilities);

    const strStr: string = str + (strExc ? `/${strExc}` : '');

    this.abilitiesData = {
      ...this.componentData,
      str: strStr,
      dex: dex,
      con: con,
      int: int,
      wis: wis,
      cha: cha,
    };

    this.html = compiled(this.abilitiesData);
  }
}
