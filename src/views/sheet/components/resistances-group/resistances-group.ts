import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { Component, ComponentData } from '../component/component';
import { Resistances } from '../resistances/resistances';

export type ResistancesGroupData = ComponentData & {
  resistancesHtml: string;

  resistancesBonusHtml: string;

  resistancesTempHtml: string;
};

export class ResistancesGroup extends Component {
  protected resistancesGroupData: ResistancesGroupData;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.resistancesGroup);

    this.resistancesGroupData = {
      ...this.componentData,
      resistancesHtml: new Resistances(
        components,
        params.spriteView.derived.resistFire,
        params.spriteView.derived.resistCold,
        params.spriteView.derived.resistElectricity,
        params.spriteView.derived.resistAcid,
        params.spriteView.derived.resistMagic,
        params.spriteView.derived.resistPoison,
        params.spriteView.derived.resistSlashing,
        params.spriteView.derived.resistCrushing,
        params.spriteView.derived.resistPiercing,
        params.spriteView.derived.resistMissile
      ).html,
      resistancesBonusHtml: new Resistances(
        components,
        params.spriteView.derivedBonus.resistFire,
        params.spriteView.derivedBonus.resistCold,
        params.spriteView.derivedBonus.resistElectricity,
        params.spriteView.derivedBonus.resistAcid,
        params.spriteView.derivedBonus.resistMagic,
        params.spriteView.derivedBonus.resistPoison,
        params.spriteView.derivedBonus.resistSlashing,
        params.spriteView.derivedBonus.resistCrushing,
        params.spriteView.derivedBonus.resistPiercing,
        params.spriteView.derivedBonus.resistMissile
      ).html,
      resistancesTempHtml: new Resistances(
        components,
        params.spriteView.derivedTemp.resistFire,
        params.spriteView.derivedTemp.resistCold,
        params.spriteView.derivedTemp.resistElectricity,
        params.spriteView.derivedTemp.resistAcid,
        params.spriteView.derivedTemp.resistMagic,
        params.spriteView.derivedTemp.resistPoison,
        params.spriteView.derivedTemp.resistSlashing,
        params.spriteView.derivedTemp.resistCrushing,
        params.spriteView.derivedTemp.resistPiercing,
        params.spriteView.derivedTemp.resistMissile
      ).html,
    };

    this.html = compiled(this.resistancesGroupData);
  }
}
