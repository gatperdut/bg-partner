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
        sheetdata.params.spriteView.derived.str,
        sheetdata.params.spriteView.derived.strExc,
        sheetdata.params.spriteView.derived.dex,
        sheetdata.params.spriteView.derived.con,
        sheetdata.params.spriteView.derived.int,
        sheetdata.params.spriteView.derived.wis,
        sheetdata.params.spriteView.derived.cha
      ).html,
      abilitiesBonusHtml: new Abilities(
        sheetdata.params.spriteView.derived.str,
        sheetdata.params.spriteView.derivedBonus.strExc,
        sheetdata.params.spriteView.derivedBonus.dex,
        sheetdata.params.spriteView.derivedBonus.con,
        sheetdata.params.spriteView.derivedBonus.int,
        sheetdata.params.spriteView.derivedBonus.wis,
        sheetdata.params.spriteView.derivedBonus.cha
      ).html,
      abilitiesTempHtml: new Abilities(
        sheetdata.params.spriteView.derived.str,
        sheetdata.params.spriteView.derivedTemp.strExc,
        sheetdata.params.spriteView.derivedTemp.dex,
        sheetdata.params.spriteView.derivedTemp.con,
        sheetdata.params.spriteView.derivedTemp.int,
        sheetdata.params.spriteView.derivedTemp.wis,
        sheetdata.params.spriteView.derivedTemp.cha
      ).html,
    };

    this.html = compiled(this.abilitiesGroupData);
  }
}
