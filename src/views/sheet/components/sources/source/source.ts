import { Eff } from '@sprite/effs/impl/eff';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type SourceData = ComponentData & {
  code: string;

  length: number;
};

export class Source extends Component {
  constructor(code: string, effs: Eff[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.source);

    const sourcesData: SourceData = {
      ...this.componentData,
      code: code,
      length: effs.length,
    };

    this.html = compiled(sourcesData);
  }
}
