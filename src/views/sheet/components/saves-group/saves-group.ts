import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SpriteView } from '../../sprite-view';
import { Saves } from '../saves/saves';

export class SavesGroup {
  public html: string;

  constructor(componentsRecord: ComponentsRecord, spriteView: SpriteView) {
    const saves: Saves = new Saves(componentsRecord.saves, spriteView.derived);

    const savesBonus: Saves = new Saves(componentsRecord.saves, spriteView.derivedBonus);

    const savesTemp: Saves = new Saves(componentsRecord.saves, spriteView.derivedTemp);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(componentsRecord.savesGroup);

    this.html = compiled({
      saves: saves.html,
      savesBonus: savesBonus.html,
      savesTemp: savesTemp.html,
    });
  }
}
