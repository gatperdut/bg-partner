import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffLevelsData = ComponentData & {
  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels extends Component {
  protected buffLevelsData: BuffLevelsData;

  constructor(casterLevel: number, spellLevel: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffLevels);

    this.buffLevelsData = {
      ...this.componentData,
      casterLevel: casterLevel,
      spellLevel: spellLevel,
    };

    this.html = compiled(this.buffLevelsData);
  }
}
