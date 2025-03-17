import { AlignValue } from '@tables/ids/align';
import { ClassValue } from '@tables/ids/class';
import { EaValue } from '@tables/ids/ea';
import { RaceValue } from '@tables/ids/race';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type HeaderData = ComponentData & {
  enemyAlly: EaValue;

  name: string;

  hp: number;

  hpMax: number;

  race: RaceValue;

  klass: ClassValue;

  levels: string;

  alignment: AlignValue;
};

export class Header extends Component {
  protected headerData: HeaderData;

  constructor(
    enemyAlly: EaValue,
    name: string,
    hp: number,
    hpMax: number,
    race: RaceValue,
    klass: ClassValue,
    levels: number[],
    alignment: AlignValue,
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.header);

    const levelsStr: string = levels.join('/');

    this.headerData = {
      ...this.componentData,
      enemyAlly: enemyAlly,
      name: name,
      hp: hp,
      hpMax: hpMax,
      race: race,
      klass: klass,
      levels: levelsStr,
      alignment: alignment,
    };

    this.html = compiled(this.headerData);
  }
}
