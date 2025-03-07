import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/eff';
import { SheetAPIUpdateParams } from '../../../renderer';

export class Buff {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, eff: Eff) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buff);

    this.html = compiled({
      eff: eff,
      duration: Math.round((eff.duration - params.spriteView.basic.time) / 15),
    });
  }
}
