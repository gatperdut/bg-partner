import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Abilities } from '../abilities/abilities';

export class AbilitiesGroup {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
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
