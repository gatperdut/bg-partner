import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';

export class BuffSingle {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, eff: Eff) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffSingle);

    this.html = compiled({
      eff: eff,
      duration: Math.round((eff.duration - params.spriteView.basic.time) / 15),
    });
  }
}
