import { Eff232 } from '@sprite/effs/impl/eff-232';
import { Eff232CondKey, eff232CondTab } from '@tables/eff/eff232cond';
import { Eff232TargetKey, eff232TargetTab } from '@tables/eff/eff232target';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffSingle232Tooltip } from '@views/sheet/components/buffs/buff-single/buff-single-232/tooltip/buff-single-232-tooltip';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle232Data = BuffSingleData;

export class BuffSingle232 extends BuffSingle {
  protected buffSingle232Data: BuffSingle232Data;

  constructor(eff: Eff232) {
    super(eff);

    const s = sheetdata;

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle232);

    const tooltipHtml: string = new BuffSingle232Tooltip(eff.resSpls).html;

    const rightHtml: string = new BuffRight(
      '⚙️',
      `${eff232TargetTab[eff.param1 as Eff232TargetKey]}\n${
        eff232CondTab[eff.param2 as Eff232CondKey]
      }`,
    ).html;

    this.buffSingle232Data = {
      ...this.buffSingleData,
      imageHtml: new Image(eff.resImage, eff.ressrc.name, tooltipHtml).html,
      rightHtml: rightHtml,
    };

    this.html = compiled(this.buffSingle232Data);
  }
}
