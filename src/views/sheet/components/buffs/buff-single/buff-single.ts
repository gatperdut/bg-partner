import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Buff, BuffData } from '../buff/buff';
import { BuffImage } from '../parts/buff-image/buff-image';

export type BuffSingleData = BuffData;

export class BuffSingle extends Buff {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, eff: Eff) {
    super(components, eff, params.timetracker.time);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffSingle);

    const buffSingleData: BuffSingleData = {
      ...this.buffData,
      imageHtml: new BuffImage(components, eff, null).html,
    };

    this.html = compiled(buffSingleData);
  }
}
