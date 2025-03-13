import Handlebars from 'handlebars';
import { sheetdata } from '../../sheetdata';
import { Abilities } from '../abilities/abilities';
import { Component, ComponentData } from '../component/component';

export type AbilitiesGroupData = ComponentData & {
  abilitiesHtml: string;

  abilitiesBonusHtml: string;

  abilitiesTempHtml: string;
};

export class AbilitiesGroup extends Component {
  protected abilitiesGroupData: AbilitiesGroupData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.abilitiesGroup
    );

    this.abilitiesGroupData = {
      ...this.componentData,
      abilitiesHtml: new Abilities(
        sheetdata.spriteView.derived.str,
        sheetdata.spriteView.derived.strExc,
        sheetdata.spriteView.derived.dex,
        sheetdata.spriteView.derived.con,
        sheetdata.spriteView.derived.int,
        sheetdata.spriteView.derived.wis,
        sheetdata.spriteView.derived.cha
      ).html,
      abilitiesBonusHtml: new Abilities(
        sheetdata.spriteView.derived.str,
        sheetdata.spriteView.derivedBonus.strExc,
        sheetdata.spriteView.derivedBonus.dex,
        sheetdata.spriteView.derivedBonus.con,
        sheetdata.spriteView.derivedBonus.int,
        sheetdata.spriteView.derivedBonus.wis,
        sheetdata.spriteView.derivedBonus.cha
      ).html,
      abilitiesTempHtml: new Abilities(
        sheetdata.spriteView.derived.str,
        sheetdata.spriteView.derivedTemp.strExc,
        sheetdata.spriteView.derivedTemp.dex,
        sheetdata.spriteView.derivedTemp.con,
        sheetdata.spriteView.derivedTemp.int,
        sheetdata.spriteView.derivedTemp.wis,
        sheetdata.spriteView.derivedTemp.cha
      ).html,
    };

    this.html = compiled(this.abilitiesGroupData);
  }
}
