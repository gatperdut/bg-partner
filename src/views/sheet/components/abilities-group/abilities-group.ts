import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SpriteView } from '../../sprite-view';
import { Abilities } from '../abilities/abilities';

export class AbilitiesGroup {
  public html: string;

  constructor(componentsRecord: ComponentsRecord, spriteView: SpriteView) {
    const abilities: Abilities = new Abilities(componentsRecord.abilities, spriteView.derived);

    const abilitiesBonus: Abilities = new Abilities(
      componentsRecord.abilities,
      spriteView.derivedBonus
    );

    const abilitiesTemp: Abilities = new Abilities(
      componentsRecord.abilities,
      spriteView.derivedTemp
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      componentsRecord.abilitiesGroup
    );

    this.html = compiled({
      abilities: abilities.html,
      abilitiesBonus: abilitiesBonus.html,
      abilitiesTemp: abilitiesTemp.html,
    });
  }
}
