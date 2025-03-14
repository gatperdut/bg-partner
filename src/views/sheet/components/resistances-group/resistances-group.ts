import { Component, ComponentData } from '@views/shared/component/component';
import { Resistances } from '@views/sheet/components/resistances/resistances';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type ResistancesGroupData = ComponentData & {
  resistancesHtml: string;

  resistancesBonusHtml: string;

  resistancesTempHtml: string;
};

export class ResistancesGroup extends Component {
  protected resistancesGroupData: ResistancesGroupData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.resistancesGroup);

    this.resistancesGroupData = {
      ...this.componentData,
      resistancesHtml: new Resistances(
        sheetdata.spriteView.derived.resistFire,
        sheetdata.spriteView.derived.resistCold,
        sheetdata.spriteView.derived.resistElectricity,
        sheetdata.spriteView.derived.resistAcid,
        sheetdata.spriteView.derived.resistMagic,
        sheetdata.spriteView.derived.resistPoison,
        sheetdata.spriteView.derived.resistSlashing,
        sheetdata.spriteView.derived.resistCrushing,
        sheetdata.spriteView.derived.resistPiercing,
        sheetdata.spriteView.derived.resistMissile,
      ).html,
      resistancesBonusHtml: new Resistances(
        sheetdata.spriteView.derivedBonus.resistFire,
        sheetdata.spriteView.derivedBonus.resistCold,
        sheetdata.spriteView.derivedBonus.resistElectricity,
        sheetdata.spriteView.derivedBonus.resistAcid,
        sheetdata.spriteView.derivedBonus.resistMagic,
        sheetdata.spriteView.derivedBonus.resistPoison,
        sheetdata.spriteView.derivedBonus.resistSlashing,
        sheetdata.spriteView.derivedBonus.resistCrushing,
        sheetdata.spriteView.derivedBonus.resistPiercing,
        sheetdata.spriteView.derivedBonus.resistMissile,
      ).html,
      resistancesTempHtml: new Resistances(
        sheetdata.spriteView.derivedTemp.resistFire,
        sheetdata.spriteView.derivedTemp.resistCold,
        sheetdata.spriteView.derivedTemp.resistElectricity,
        sheetdata.spriteView.derivedTemp.resistAcid,
        sheetdata.spriteView.derivedTemp.resistMagic,
        sheetdata.spriteView.derivedTemp.resistPoison,
        sheetdata.spriteView.derivedTemp.resistSlashing,
        sheetdata.spriteView.derivedTemp.resistCrushing,
        sheetdata.spriteView.derivedTemp.resistPiercing,
        sheetdata.spriteView.derivedTemp.resistMissile,
      ).html,
    };

    this.html = compiled(this.resistancesGroupData);
  }
}
