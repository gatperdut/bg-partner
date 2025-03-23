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
      resistFire: sheetdata.sprite.derived.resistFire,
      resistCold: sheetdata.sprite.derived.resistCold,
      resistElectricity: sheetdata.sprite.derived.resistElectricity,
      resistAcid: sheetdata.sprite.derived.resistAcid,
      resistMagic: sheetdata.sprite.derived.resistMagic,
      resistMagicDamage: sheetdata.sprite.derived.resistMagicDamage,
      resistPoison: sheetdata.sprite.derived.resistPoison,
      resistSlashing: sheetdata.sprite.derived.resistSlashing,
      resistCrushing: sheetdata.sprite.derived.resistCrushing,
      resistPiercing: sheetdata.sprite.derived.resistPiercing,
      resistMissile: sheetdata.sprite.derived.resistMissile,
    };

    this.html = compiled(this.resistancesData);
  }
}
