import { Eff } from '@sprite/effs/impl/eff';
import { SchoolKey, schoolTab } from '@tables/school';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle204Data = BuffSingleData;

export class BuffSingle204 extends BuffSingle {
  protected buffSingle204Data: BuffSingle204Data;

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle204);

    this.buffSingle204Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight('⚙️', schoolTab[eff.param2 as SchoolKey]).html,
    };

    this.html = compiled(this.buffSingle204Data);
  }
}
