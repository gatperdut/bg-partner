import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle137Data = BuffSingleData;

export class BuffSingle137 extends BuffSingle {
  protected buffSingle137Data: BuffSingle137Data;

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle137);

    this.buffSingle137Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight('⚙️', 'Negative chant').html,
    };

    this.html = compiled(this.buffSingle137Data);
  }
}
