import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import { Buffs } from '@views/sheet/components/buffs/buffs/buffs';
import { Tooltip, TooltipData } from '@views/sheet/components/tooltips/tooltip';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffItemTooltipData = TooltipData & {
  buffsHtml: string;
};

export class BuffItemTooltip extends Tooltip {
  protected buffItemTooltipData: BuffItemTooltipData;

  public static effsHidden: EffKey[] = [0, 1, 33, 34, 35, 36, 37, 101, 120, 206];

  constructor(effs: Eff[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffItemTooltip);

    const effsShown: Eff[] = _.filter(
      effs,
      (eff: Eff): boolean => !_.includes(BuffItemTooltip.effsHidden, eff.key),
    );

    if (!effsShown.length) {
      return;
    }

    this.buffItemTooltipData = {
      ...this.tooltipData,
      buffsHtml: new Buffs(effsShown, true, true).html,
    };

    this.html = compiled(this.buffItemTooltipData);
  }
}
