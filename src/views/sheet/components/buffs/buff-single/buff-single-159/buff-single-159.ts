import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle159Data = BuffSingleData;

export class BuffSingle159 extends BuffSingle {
  protected buffSingle159Data: BuffSingle159Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle159);

    this.buffSingle159Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(eff.param1.toString(), 'Number of images left.').html,
    };

    this.html = compiled(this.buffSingle159Data);
  }
}
