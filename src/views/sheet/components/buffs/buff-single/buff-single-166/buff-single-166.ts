import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle166Data = BuffSingleData;

export class BuffSingle166 extends BuffSingle {
  protected buffSingle166Data: BuffSingle166Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle166);

    let title: string;

    switch (eff.param2) {
      case 0:
        title = 'Cumulative magic resistance %';

        break;
      case 1:
        title = 'Flat magic resistance %';

        break;
    }

    this.buffSingle166Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(eff.param1.toString(), title).html,
    };

    this.html = compiled(this.buffSingle166Data);
  }
}
