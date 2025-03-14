import { Component, ComponentData } from '@views/shared/component/component';
import { Saves } from '@views/sheet/components/saves/saves';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type SavesGroupData = ComponentData & {
  savesHtml: string;
  savesBonusHtml: string;
  savesTempHtml: string;
};

export class SavesGroup extends Component {
  protected savesGroupData: SavesGroupData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.savesGroup);

    this.savesGroupData = {
      ...this.componentData,
      savesHtml: new Saves(
        sheetdata.spriteView.derived.saveVsDeath,
        sheetdata.spriteView.derived.saveVsWands,
        sheetdata.spriteView.derived.saveVsPoly,
        sheetdata.spriteView.derived.saveVsBreath,
        sheetdata.spriteView.derived.saveVsSpell,
      ).html,
      savesBonusHtml: new Saves(
        sheetdata.spriteView.derivedBonus.saveVsDeath,
        sheetdata.spriteView.derivedBonus.saveVsWands,
        sheetdata.spriteView.derivedBonus.saveVsPoly,
        sheetdata.spriteView.derivedBonus.saveVsBreath,
        sheetdata.spriteView.derivedBonus.saveVsSpell,
      ).html,
      savesTempHtml: new Saves(
        sheetdata.spriteView.derivedTemp.saveVsDeath,
        sheetdata.spriteView.derivedTemp.saveVsWands,
        sheetdata.spriteView.derivedTemp.saveVsPoly,
        sheetdata.spriteView.derivedTemp.saveVsBreath,
        sheetdata.spriteView.derivedTemp.saveVsSpell,
      ).html,
    };

    this.html = compiled(this.savesGroupData);
  }
}
