import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Component, ComponentData } from '../component/component';
import { Saves } from '../saves/saves';

export type SavesGroupData = ComponentData & {
  savesHtml: string;
  savesBonusHtml: string;
  savesTempHtml: string;
};

export class SavesGroup extends Component {
  protected savesGroupData: SavesGroupData;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.savesGroup);

    this.savesGroupData = {
      ...this.componentData,
      savesHtml: new Saves(
        components,
        params.spriteView.derived.saveVsDeath,
        params.spriteView.derived.saveVsWands,
        params.spriteView.derived.saveVsPoly,
        params.spriteView.derived.saveVsBreath,
        params.spriteView.derived.saveVsSpell
      ).html,
      savesBonusHtml: new Saves(
        components,
        params.spriteView.derivedBonus.saveVsDeath,
        params.spriteView.derivedBonus.saveVsWands,
        params.spriteView.derivedBonus.saveVsPoly,
        params.spriteView.derivedBonus.saveVsBreath,
        params.spriteView.derivedBonus.saveVsSpell
      ).html,
      savesTempHtml: new Saves(
        components,
        params.spriteView.derivedTemp.saveVsDeath,
        params.spriteView.derivedTemp.saveVsWands,
        params.spriteView.derivedTemp.saveVsPoly,
        params.spriteView.derivedTemp.saveVsBreath,
        params.spriteView.derivedTemp.saveVsSpell
      ).html,
    };

    this.html = compiled(this.savesGroupData);
  }
}
