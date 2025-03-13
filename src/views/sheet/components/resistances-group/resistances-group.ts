import Handlebars from 'handlebars';
import { sheetdata } from '../../sheetdata';
import { Component, ComponentData } from '../component/component';
import { Resistances } from '../resistances/resistances';

export type ResistancesGroupData = ComponentData & {
  resistancesHtml: string;

  resistancesBonusHtml: string;

  resistancesTempHtml: string;
};

export class ResistancesGroup extends Component {
  protected resistancesGroupData: ResistancesGroupData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.resistancesGroup
    );

    this.resistancesGroupData = {
      ...this.componentData,
      resistancesHtml: new Resistances(
        sheetdata.params.spriteView.derived.resistFire,
        sheetdata.params.spriteView.derived.resistCold,
        sheetdata.params.spriteView.derived.resistElectricity,
        sheetdata.params.spriteView.derived.resistAcid,
        sheetdata.params.spriteView.derived.resistMagic,
        sheetdata.params.spriteView.derived.resistPoison,
        sheetdata.params.spriteView.derived.resistSlashing,
        sheetdata.params.spriteView.derived.resistCrushing,
        sheetdata.params.spriteView.derived.resistPiercing,
        sheetdata.params.spriteView.derived.resistMissile
      ).html,
      resistancesBonusHtml: new Resistances(
        sheetdata.params.spriteView.derivedBonus.resistFire,
        sheetdata.params.spriteView.derivedBonus.resistCold,
        sheetdata.params.spriteView.derivedBonus.resistElectricity,
        sheetdata.params.spriteView.derivedBonus.resistAcid,
        sheetdata.params.spriteView.derivedBonus.resistMagic,
        sheetdata.params.spriteView.derivedBonus.resistPoison,
        sheetdata.params.spriteView.derivedBonus.resistSlashing,
        sheetdata.params.spriteView.derivedBonus.resistCrushing,
        sheetdata.params.spriteView.derivedBonus.resistPiercing,
        sheetdata.params.spriteView.derivedBonus.resistMissile
      ).html,
      resistancesTempHtml: new Resistances(
        sheetdata.params.spriteView.derivedTemp.resistFire,
        sheetdata.params.spriteView.derivedTemp.resistCold,
        sheetdata.params.spriteView.derivedTemp.resistElectricity,
        sheetdata.params.spriteView.derivedTemp.resistAcid,
        sheetdata.params.spriteView.derivedTemp.resistMagic,
        sheetdata.params.spriteView.derivedTemp.resistPoison,
        sheetdata.params.spriteView.derivedTemp.resistSlashing,
        sheetdata.params.spriteView.derivedTemp.resistCrushing,
        sheetdata.params.spriteView.derivedTemp.resistPiercing,
        sheetdata.params.spriteView.derivedTemp.resistMissile
      ).html,
    };

    this.html = compiled(this.resistancesGroupData);
  }
}
