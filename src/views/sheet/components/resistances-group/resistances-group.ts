import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SpriteView } from '../../sprite-view';
import { Resistances } from '../resistances/resistances';

export class ResistancesGroup {
  public html: string;

  constructor(componentsRecord: ComponentsRecord, spriteView: SpriteView) {
    const resistances = new Resistances(componentsRecord.resistances, spriteView.derived);

    const resistancesBonus = new Resistances(componentsRecord.resistances, spriteView.derivedBonus);

    const resistancesTemp = new Resistances(componentsRecord.resistances, spriteView.derivedTemp);

    const compiled = Handlebars.compile(componentsRecord.resistancesGroup);

    this.html = compiled({
      resistances: resistances.html,
      resistancesBonus: resistancesBonus.html,
      resistancesTemp: resistancesTemp.html,
    });
  }
}
