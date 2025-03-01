import Handlebars from 'handlebars';
import { SpriteView } from '../../sprite-view';
import { Resistances } from '../resistances/resistances';

export class ResistancesGroup {
  public html: string;

  constructor(
    templateResistancesGroup: string,
    templateResistances: string,
    spriteView: SpriteView
  ) {
    const resistances = new Resistances(templateResistances, spriteView.derived);

    const resistancesBonus = new Resistances(templateResistances, spriteView.derivedBonus);

    const resistancesTemp = new Resistances(templateResistances, spriteView.derivedTemp);

    const compiled = Handlebars.compile(templateResistancesGroup);

    this.html = compiled({
      resistances: resistances.html,
      resistancesBonus: resistancesBonus.html,
      resistancesTemp: resistancesTemp.html,
    });
  }
}
