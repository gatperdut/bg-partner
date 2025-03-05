import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { DerivedView } from '../../sprite-view';

export class Abilities {
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
