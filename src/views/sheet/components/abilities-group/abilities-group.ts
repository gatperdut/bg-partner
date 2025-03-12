import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Abilities } from '../abilities/abilities';
import { Component } from '../component/component';

export class AbilitiesGroup extends Component {
  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    super();

    const abilities: Abilities = new Abilities(components, params, params.spriteView.derived);

    const abilitiesBonus: Abilities = new Abilities(
      components,
      params,
      params.spriteView.derivedBonus
    );

    const abilitiesTemp: Abilities = new Abilities(
      components,
      params,
      params.spriteView.derivedTemp
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.abilitiesGroup);

    this.html = compiled({
      abilities: abilities.html,
      abilitiesBonus: abilitiesBonus.html,
      abilitiesTemp: abilitiesTemp.html,
    });
  }
}
