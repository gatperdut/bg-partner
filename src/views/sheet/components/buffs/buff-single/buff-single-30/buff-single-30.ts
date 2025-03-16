import { Eff } from '@sprite/effs/impl/eff';
import { Eff30TypeKey, eff30TypeTab } from '@tables/eff/eff30type';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle30Data = BuffSingleData;

export class BuffSingle30 extends BuffSingle {
  protected buffSingle30Data: BuffSingle30Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle30);

    this.buffSingle30Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(
        eff.param1.toString(),
        `Fire resistance %, ${eff30TypeTab[eff.param2 as Eff30TypeKey]}.`,
      ).html,
    };

    this.html = compiled(this.buffSingle30Data);
  }
}
