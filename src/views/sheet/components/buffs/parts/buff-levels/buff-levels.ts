import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Component, ComponentData } from '../../../component/component';

export type BuffLevelsData = ComponentData & {
  casterLevel: number;

  spellLevel: number;
};

export class BuffLevels extends Component {
  protected buffLevelsData: BuffLevelsData;

  constructor(components: ComponentsRecord, casterLevel: number, spellLevel: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffLevels);

    this.buffLevelsData = {
      ...this.componentData,
      casterLevel: casterLevel,
      spellLevel: spellLevel,
    };

    this.html = compiled(this.buffLevelsData);
  }
}
