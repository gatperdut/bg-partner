import { Eff } from '@sprite/effs/impl/eff';
import { idsTab } from '@tables/ids/ids';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle344Data = BuffSingleData;

export class BuffSingle344 extends BuffSingle {
  protected buffSingle344Data: BuffSingle344Data;

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle344);

    // @ts-ignore
    let title: string = `Enchantment level against ${idsTab[eff.param2][eff.param1]}.`;

    this.buffSingle344Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(eff.special.toString(), title).html,
    };

    this.html = compiled(this.buffSingle344Data);
  }
}
