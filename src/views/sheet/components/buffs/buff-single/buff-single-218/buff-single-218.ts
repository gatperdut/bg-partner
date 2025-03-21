import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle218Data = BuffSingleData;

export class BuffSingle218 extends BuffSingle {
  protected buffSingle218Data: BuffSingle218Data;

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle218);

    this.buffSingle218Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(eff.param1.toString(), 'Number of skins left.').html,
    };

    this.html = compiled(this.buffSingle218Data);
  }
}
