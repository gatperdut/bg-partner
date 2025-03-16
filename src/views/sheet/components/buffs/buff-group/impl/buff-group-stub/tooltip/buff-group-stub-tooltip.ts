import { Eff } from '@sprite/effs/impl/eff';
import { Buffs } from '@views/sheet/components/buffs/buffs/buffs';
import { Tooltip, TooltipData } from '@views/sheet/components/tooltips/tooltip';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffGroupStubTooltipData = TooltipData & {
  buffsHtml: string;
};

export class BuffGroupStubTooltip extends Tooltip {
  protected buffGroupStubTooltipData: BuffGroupStubTooltipData;

  constructor(effs: Eff[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.hbs.buffGroupStubTooltip,
    );

    this.buffGroupStubTooltipData = {
      ...this.tooltipData,
      buffsHtml: new Buffs(effs, true, false).html,
    };

    this.html = compiled(this.buffGroupStubTooltipData);
  }
}
