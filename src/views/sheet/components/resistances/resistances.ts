import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type ResistancesData = ComponentData & {
  resistFire: number;
  resistCold: number;
  resistElectricity: number;
  resistAcid: number;
  resistMagic: number;
  resistMagicDamage: number;
  resistPoison: number;
  resistSlashing: number;
  resistCrushing: number;
  resistPiercing: number;
  resistMissile: number;
};

export class Resistances extends Component {
  protected resistancesData: ResistancesData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.resistances);

    this.resistancesData = {
      ...this.componentData,
      resistFire: sheetdata.spriteView.derived.resistFire,
      resistCold: sheetdata.spriteView.derived.resistCold,
      resistElectricity: sheetdata.spriteView.derived.resistElectricity,
      resistAcid: sheetdata.spriteView.derived.resistAcid,
      resistMagic: sheetdata.spriteView.derived.resistMagic,
      resistMagicDamage: sheetdata.spriteView.derived.resistMagicDamage,
      resistPoison: sheetdata.spriteView.derived.resistPoison,
      resistSlashing: sheetdata.spriteView.derived.resistSlashing,
      resistCrushing: sheetdata.spriteView.derived.resistCrushing,
      resistPiercing: sheetdata.spriteView.derived.resistPiercing,
      resistMissile: sheetdata.spriteView.derived.resistMissile,
    };

    this.html = compiled(this.resistancesData);
  }
}
