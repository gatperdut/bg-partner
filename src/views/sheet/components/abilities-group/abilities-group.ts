import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SpriteView } from '../../sprite-view';
import { Abilities } from '../abilities/abilities';

export class AbilitiesGroup {
  public html: string;

  constructor(componentsRecord: ComponentsRecord, spriteView: SpriteView) {
    const abilities = new Abilities(componentsRecord.abilities, spriteView.derived);

    const abilitiesBonus = new Abilities(componentsRecord.abilities, spriteView.derivedBonus);

    const abilitiesTemp = new Abilities(componentsRecord.abilities, spriteView.derivedTemp);

    const compiled = Handlebars.compile(componentsRecord.abilitiesGroup);

    this.html = compiled({
      abilities: abilities.html,
      abilitiesBonus: abilitiesBonus.html,
      abilitiesTemp: abilitiesTemp.html,
    });
  }
}
