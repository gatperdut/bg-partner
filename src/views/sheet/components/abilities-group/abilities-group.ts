import Handlebars from 'handlebars';
import { SpriteView } from '../../sprite-view';
import { Abilities } from '../abilities/abilities';

export class AbilitiesGroup {
  public html: string;

  constructor(templateAbilitiesGroup: string, templateAbilities: string, spriteView: SpriteView) {
    const abilities = new Abilities(templateAbilities, spriteView.derived);

    const abilitiesBonus = new Abilities(templateAbilities, spriteView.derivedBonus);

    const abilitiesTemp = new Abilities(templateAbilities, spriteView.derivedTemp);

    const compiled = Handlebars.compile(templateAbilitiesGroup);

    this.html = compiled({
      abilities: abilities.html,
      abilitiesBonus: abilitiesBonus.html,
      abilitiesTemp: abilitiesTemp.html,
    });
  }
}
