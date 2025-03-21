import { Eff } from '@sprite/effs/impl/eff';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffSingle142Data = BuffSingleData;

export class BuffSingle142 extends BuffSingle {
  protected buffSingle142Data: BuffSingle142Data;

  public static iconsShown: number[] = [108];

  constructor(eff: Eff) {
    super(eff);

    if (!this.buffSingleData) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle142);

    if (!_.includes(BuffSingle142.iconsShown, eff.param2)) {
      return;
    }

    this.buffSingle142Data = {
      ...this.buffSingleData,
    };

    this.html = compiled(this.buffSingle142Data);
  }
}
