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

    const levelsView: string = sheetdata.sprite.profile.levels.join('/');

    const classView: string = this.classView();

    this.headerData = {
      ...this.componentData,
      enemyAlly: sheetdata.sprite.profile.enemyAlly,
      gender: sheetdata.sprite.profile.gender,
      name: sheetdata.sprite.basic.name,
      hp: sheetdata.sprite.basic.hp,
      hpMax: sheetdata.sprite.derived.hpMax,
      race: sheetdata.sprite.profile.race,
      klass: classView,
      levels: levelsView,
      alignment: sheetdata.sprite.profile.alignment,
    };

    this.html = compiled(this.headerData);
  }

  private classView(): string {
    const sd = sheetdata;

    if (!sheetdata.sprite.profile.kit || sheetdata.sprite.profile.kit === 'Generalist') {
      return sheetdata.sprite.profile.klass;
    }

    const split: string[] = sheetdata.sprite.profile.klass.split('/');

    split[0] = sheetdata.sprite.profile.kit;

    return split.join('/');
  }
}
