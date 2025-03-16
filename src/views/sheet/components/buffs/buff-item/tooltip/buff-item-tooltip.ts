import { Eff } from '@sprite/effs/impl/eff';
import { Buffs } from '@views/sheet/components/buffs/buffs/buffs';
import { Tooltip, TooltipData } from '@views/sheet/components/tooltips/tooltip';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffItemTooltipData = TooltipData & {
  buffsHtml: string;
};

export class BuffItemTooltip extends Tooltip {
  protected buffItemTooltipData: BuffItemTooltipData;

  constructor(effs: Eff[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffItemTooltip);

    this.buffItemTooltipData = {
      ...this.tooltipData,
      buffsHtml: new Buffs(effs, true, true).html,
    };

    this.html = compiled(this.buffItemTooltipData);
  }
}
