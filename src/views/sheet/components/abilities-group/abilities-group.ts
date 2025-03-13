import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Abilities } from '../abilities/abilities';
import { Component, ComponentData } from '../component/component';

export type AbilitiesGroupData = ComponentData & {
  abilitiesHtml: string;

  abilitiesBonusHtml: string;

  abilitiesTempHtml: string;
};

export class AbilitiesGroup extends Component {
  protected abilitiesGroupData: AbilitiesGroupData;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.abilitiesGroup);

    this.abilitiesGroupData = {
      ...this.componentData,
      abilitiesHtml: new Abilities(
        components,
        params.spriteView.derived.str,
        params.spriteView.derived.strExc,
        params.spriteView.derived.dex,
        params.spriteView.derived.con,
        params.spriteView.derived.int,
        params.spriteView.derived.wis,
        params.spriteView.derived.cha
      ).html,
      abilitiesBonusHtml: new Abilities(
        components,
        params.spriteView.derived.str,
        params.spriteView.derivedBonus.strExc,
        params.spriteView.derivedBonus.dex,
        params.spriteView.derivedBonus.con,
        params.spriteView.derivedBonus.int,
        params.spriteView.derivedBonus.wis,
        params.spriteView.derivedBonus.cha
      ).html,
      abilitiesTempHtml: new Abilities(
        components,
        params.spriteView.derived.str,
        params.spriteView.derivedTemp.strExc,
        params.spriteView.derivedTemp.dex,
        params.spriteView.derivedTemp.con,
        params.spriteView.derivedTemp.int,
        params.spriteView.derivedTemp.wis,
        params.spriteView.derivedTemp.cha
      ).html,
    };

    this.html = compiled(this.abilitiesGroupData);
  }
}
