import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle98Data = BuffSingleData;

export class BuffSingle98 extends BuffSingle {
  protected buffSingle98Data: BuffSingle98Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle98);

    let right: string;

    switch (eff.param2) {
      case 0:
        right = '1\n1s';
        break;
      case 1:
        right = '1\n1s';
        break;
      case 2:
        right = `${eff.param1}\n?s`;
        break;
      case 3:
        right = `1\n${eff.param1}s`;
        break;
      case 4:
        right = `${eff.param3}\n${eff.param1}s`;
        break;
    }

    this.buffSingle98Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(right, 'HP\nseconds').html,
    };

    this.html = compiled(this.buffSingle98Data);
  }
}
