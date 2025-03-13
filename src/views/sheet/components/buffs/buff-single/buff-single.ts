import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { Image } from '../../../../../views/sheet/components/image/image';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Buff, BuffData } from '../buff/buff';

export type BuffSingleData = BuffData;

export class BuffSingle extends Buff {
  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, eff: Eff) {
    super(components, eff, params.timetracker.time);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffSingle);

    const buffSingleData: BuffSingleData = {
      ...this.buffData,
      imageHtml: new Image(components, eff.resImage, eff.ressrc.name, null).html,
    };

    this.html = compiled(buffSingleData);
  }
}
