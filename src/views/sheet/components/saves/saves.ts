import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../src/components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { DerivedView } from '../../sprite-view';

export class Saves {
  public html: string;

  constructor(
    components: ComponentsRecord,
    params: SheetAPIUpdateParams,
    derivedView: DerivedView
  ) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.abilities);

    this.html = compiled(derivedView);
  }
}
