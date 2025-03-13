import Handlebars from 'handlebars';
import { sheetdata } from '../../sheetdata';
import { Component, ComponentData } from '../component/component';
import { Saves } from '../saves/saves';

export type SavesGroupData = ComponentData & {
  savesHtml: string;
  savesBonusHtml: string;
  savesTempHtml: string;
};

export class SavesGroup extends Component {
  protected savesGroupData: SavesGroupData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.savesGroup
    );

    this.savesGroupData = {
      ...this.componentData,
      savesHtml: new Saves(
        sheetdata.params.spriteView.derived.saveVsDeath,
        sheetdata.params.spriteView.derived.saveVsWands,
        sheetdata.params.spriteView.derived.saveVsPoly,
        sheetdata.params.spriteView.derived.saveVsBreath,
        sheetdata.params.spriteView.derived.saveVsSpell
      ).html,
      savesBonusHtml: new Saves(
        sheetdata.params.spriteView.derivedBonus.saveVsDeath,
        sheetdata.params.spriteView.derivedBonus.saveVsWands,
        sheetdata.params.spriteView.derivedBonus.saveVsPoly,
        sheetdata.params.spriteView.derivedBonus.saveVsBreath,
        sheetdata.params.spriteView.derivedBonus.saveVsSpell
      ).html,
      savesTempHtml: new Saves(
        sheetdata.params.spriteView.derivedTemp.saveVsDeath,
        sheetdata.params.spriteView.derivedTemp.saveVsWands,
        sheetdata.params.spriteView.derivedTemp.saveVsPoly,
        sheetdata.params.spriteView.derivedTemp.saveVsBreath,
        sheetdata.params.spriteView.derivedTemp.saveVsSpell
      ).html,
    };

    this.html = compiled(this.savesGroupData);
  }
}
