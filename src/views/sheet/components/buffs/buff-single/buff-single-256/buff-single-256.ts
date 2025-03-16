import { Eff256 } from '@sprite/effs/impl/eff-256';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffSingle256Tooltip } from '@views/sheet/components/buffs/buff-single/buff-single-256/tooltip/buff-single-256-tooltip';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle256Data = BuffSingleData;

export class BuffSingle256 extends BuffSingle {
  protected buffSingle256Data: BuffSingle256Data;

  constructor(eff: Eff256) {
    super(eff);

    const s = sheetdata;

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle256);

    const tooltipHtml: string = new BuffSingle256Tooltip(eff.resSpls).html;

    this.buffSingle256Data = {
      ...this.buffSingleData,
      imageHtml: new Image(eff.resImage, eff.ressrc.name, tooltipHtml).html,
    };

    this.html = compiled(this.buffSingle256Data);
  }
}
