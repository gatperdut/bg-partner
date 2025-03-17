import { AlignValue } from '@tables/ids/align';
import { EaValue } from '@tables/ids/ea';
import { GenderValue } from '@tables/ids/gender';
import { RaceValue } from '@tables/ids/race';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type HeaderData = ComponentData & {
  enemyAlly: EaValue;

  gender: GenderValue;

  name: string;

  hp: number;

  hpMax: number;

  race: RaceValue;

  klass: string;

  levels: string;

  alignment: AlignValue;
};

export class Header extends Component {
  protected headerData: HeaderData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.header);

    const levelsView: string = sheetdata.spriteView.profile.levels.join('/');

    const classView: string = this.classView();

    this.headerData = {
      ...this.componentData,
      enemyAlly: sheetdata.spriteView.profile.enemyAlly,
      gender: sheetdata.spriteView.profile.gender,
      name: sheetdata.spriteView.basic.name,
      hp: sheetdata.spriteView.basic.hp,
      hpMax: sheetdata.spriteView.derived.hpMax,
      race: sheetdata.spriteView.profile.race,
      klass: classView,
      levels: levelsView,
      alignment: sheetdata.spriteView.profile.alignment,
    };

    this.html = compiled(this.headerData);
  }

  private classView(): string {
    if (sheetdata.spriteView.profile.kit === 'Generalist') {
      return sheetdata.spriteView.profile.klass;
    }

    const split: string[] = sheetdata.spriteView.profile.klass.split('/');

    split[0] = sheetdata.spriteView.profile.kit;

    return split.join('/');
  }
}
