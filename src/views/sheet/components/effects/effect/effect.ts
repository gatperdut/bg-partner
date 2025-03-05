import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';

export class Effect {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, eff: Eff) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.effect);

    this.html = compiled(eff);
  }
}
