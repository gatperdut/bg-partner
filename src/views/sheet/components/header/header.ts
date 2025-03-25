import { AlignValue } from '@tables/ids/align';
import { GenderValue } from '@tables/ids/gender';
import { RaceValue } from '@tables/ids/race';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type HeaderData = ComponentData & {
  ids: string;

  gender: GenderValue;

  name: string;

  hp: number;

  hpMax: number;

  race: RaceValue;

  klass: string;

  hatedRace: string;

  levels: string;

  alignment: AlignValue;
};

export class Header extends Component {
  protected headerData: HeaderData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.header);

    const ids: string = this.ids();

    const klass: string = this.klass();

    const levels: string = sheetdata.sprite.profile.levels.join('/');

    this.headerData = {
      ...this.componentData,
      ids: ids,
      gender: sheetdata.sprite.profile.gender,
      name: sheetdata.sprite.basic.name,
      hp: sheetdata.sprite.basic.hp,
      hpMax: sheetdata.sprite.derived.hpMax,
      race: sheetdata.sprite.profile.race,
      hatedRace: sheetdata.sprite.profile.hatedRace,
      klass: klass,
      levels: levels,
      alignment: sheetdata.sprite.profile.alignment,
    };

    this.html = compiled(this.headerData);
  }

  private ids(): string {
    let result: string = '';

    result += `Allegiance: ${sheetdata.sprite.profile.enemyAlly}\n`;

    result += `General: ${sheetdata.sprite.profile.general}\n`;

    result += `Specific: ${sheetdata.sprite.profile.specific || 'Not provided'}`;

    return result;
  }

  private klass(): string {
    const sd = sheetdata;

    if (!sheetdata.sprite.profile.kit || sheetdata.sprite.profile.kit === 'Generalist') {
      return sheetdata.sprite.profile.klass;
    }

    const split: string[] = sheetdata.sprite.profile.klass.split('/');

    split[0] = sheetdata.sprite.profile.kit;

    return split.join('/');
  }
}
