import { Component, ComponentData } from '@views/sheet/components/component/component';
import { sheetdata } from '@views/sheet/sheetdata';
import * as Handlebars from 'handlebars';

export type AbilitiesData = ComponentData & {
  str: number;

  strExc: number;

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
    cha: number
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.components.abilities);

    this.abilitiesData = {
      ...this.componentData,
      str: str,
      strExc: strExc,
      dex: dex,
      con: con,
      int: int,
      wis: wis,
      cha: cha,
    };

    this.html = compiled(this.abilitiesData);
  }
}
