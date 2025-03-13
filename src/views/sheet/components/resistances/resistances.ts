import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../src/components/components';
import { Component, ComponentData } from '../component/component';

export type ResistancesData = ComponentData & {
  resistFire: number;
  resistCold: number;
  resistElectricity: number;
  resistAcid: number;
  resistMagic: number;
  resistPoison: number;
  resistSlashing: number;
  resistCrushing: number;
  resistPiercing: number;
  resistMissile: number;
};

export class Resistances extends Component {
  protected resistancesData: ResistancesData;

  constructor(
    components: ComponentsRecord,
    resistFire: number,
    resistCold: number,
    resistElectricity: number,
    resistAcid: number,
    resistMagic: number,
    resistPoison: number,
    resistSlashing: number,
    resistCrushing: number,
    resistPiercing: number,
    resistMissile: number
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.resistances);

    this.resistancesData = {
      ...this.componentData,
      resistFire: resistFire,
      resistCold: resistCold,
      resistElectricity: resistElectricity,
      resistAcid: resistAcid,
      resistMagic: resistMagic,
      resistPoison: resistPoison,
      resistSlashing: resistSlashing,
      resistCrushing: resistCrushing,
      resistPiercing: resistPiercing,
      resistMissile: resistMissile,
    };

    this.html = compiled(this.resistancesData);
  }
}
