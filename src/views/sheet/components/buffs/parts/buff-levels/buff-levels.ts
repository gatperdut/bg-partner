import Handlebars from 'handlebars';
import { sheetdata } from '../../../../../../views/sheet/sheetdata';
import { Component, ComponentData } from '../../../component/component';

export type BuffLevelsData = ComponentData & {
  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels extends Component {
  protected buffLevelsData: BuffLevelsData;

  constructor(casterLevel: number, spellLevel: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffLevels
    );

    this.buffLevelsData = {
      ...this.componentData,
      casterLevel: casterLevel,
      spellLevel: spellLevel,
    };

    this.html = compiled(this.buffLevelsData);
  }
}
