import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle86Data = BuffSingleData;

export class BuffSingle86 extends BuffSingle {
  protected buffSingle86Data: BuffSingle86Data;

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle86);

    let title: string;

    switch (eff.param2) {
      case 0:
        title = 'Additive damage % reduction';

        break;
      case 1:
        title = 'Flat damage % reduction';

        break;

      case 3:
        title = 'Multiplicative damage % reduction';

        break;
    }

    this.buffSingle86Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(eff.param1.toString(), title).html,
    };

    this.html = compiled(this.buffSingle86Data);
  }
}
