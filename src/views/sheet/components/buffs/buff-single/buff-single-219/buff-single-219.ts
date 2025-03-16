import { Eff } from '@sprite/effs/impl/eff';
import { idsTab } from '@tables/ids';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle219Data = BuffSingleData;

export class BuffSingle219 extends BuffSingle {
  protected buffSingle219Data: BuffSingle219Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle219);

    // @ts-ignore
    let right: string = idsTab[eff.param2][eff.param1];

    this.buffSingle219Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight('👤', right).html,
    };

    this.html = compiled(this.buffSingle219Data);
  }
}
