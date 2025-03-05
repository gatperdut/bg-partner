import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../components/components';
import { Effect } from '../../../../../sprite/effects/impl/effect';
import { SheetAPIUpdateParams } from '../../../../../views/sheet/renderer';

export class Condition {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, effect: Effect) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.condition);

    if (effect.id !== 218) {
      return;
    }

    this.html = compiled(effect);
  }
}
