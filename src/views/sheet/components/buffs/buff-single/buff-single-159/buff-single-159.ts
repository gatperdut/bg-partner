import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../../renderer';
import { BuffRight } from '../../parts/buff-right/buff-right';
import { BuffSingle, BuffSingleData } from '../buff-single';

export type BuffSingle159Data = BuffSingleData;

export class BuffSingle159 extends BuffSingle {
  protected buffSingle159Data: BuffSingle159Data;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, eff: Eff) {
    super(components, params, eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffSingle159);

    this.buffSingle159Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(components, eff.param1, 'Number of images left.').html,
    };

    this.html = compiled(this.buffSingle159Data);
  }
}
