import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle131Data = BuffSingleData;

export class BuffSingle131 extends BuffSingle {
  protected buffSingle131Data: BuffSingle131Data;

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle131);

    this.buffSingle131Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight('⚙️', 'Positive chant').html,
    };

    this.html = compiled(this.buffSingle131Data);
  }
}
