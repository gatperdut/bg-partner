import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Resistances } from '../resistances/resistances';

export class ResistancesGroup {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    const resistances: Resistances = new Resistances(components, params, params.spriteView.derived);

    const resistancesBonus: Resistances = new Resistances(
      components,
      params,
      params.spriteView.derivedBonus
    );

    const resistancesTemp: Resistances = new Resistances(
      components,
      params,
      params.spriteView.derivedTemp
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.resistancesGroup);

    this.html = compiled({
      resistances: resistances.html,
      resistancesBonus: resistancesBonus.html,
      resistancesTemp: resistancesTemp.html,
    });
  }
}
