import { Eff } from '@sprite/effs/impl/eff';
import { Tooltip, TooltipData } from '@views/sheet/components/tooltips/tooltip';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import { Buffs } from '../../buffs/buffs';

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
      buffsHtml: new Buffs(effs, true).html,
    };

    this.html = compiled(this.buffItemTooltipData);
  }
}
