import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { Component, ComponentData } from '../component/component';

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
    components: ComponentsRecord,
    str: number,
    strExc: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.abilities);

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
