import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Saves } from '../saves/saves';

export class SavesGroup {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    const saves: Saves = new Saves(components, params, params.spriteView.derived);

    const savesBonus: Saves = new Saves(components, params, params.spriteView.derivedBonus);

    const savesTemp: Saves = new Saves(components, params, params.spriteView.derivedTemp);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.savesGroup);

    this.html = compiled({
      saves: saves.html,
      savesBonus: savesBonus.html,
      savesTemp: savesTemp.html,
    });
  }
}
