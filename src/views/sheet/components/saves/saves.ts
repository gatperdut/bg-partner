import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../src/components/components';
import { Component, ComponentData } from '../component/component';

export type SavesData = ComponentData & {
  saveVsDeath: number;
  saveVsWands: number;
  saveVsPoly: number;
  saveVsBreath: number;
  saveVsSpell: number;
};

export class Saves extends Component {
  protected savesData: SavesData;

  constructor(
    components: ComponentsRecord,
    saveVsDeath: number,
    saveVsWands: number,
    saveVsPoly: number,
    saveVsBreath: number,
    saveVsSpell: number
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.saves);

    this.savesData = {
      ...this.componentData,
      saveVsDeath: saveVsDeath,
      saveVsWands: saveVsWands,
      saveVsPoly: saveVsPoly,
      saveVsBreath: saveVsBreath,
      saveVsSpell: saveVsSpell,
    };

    this.html = compiled(this.savesData);
  }
}
