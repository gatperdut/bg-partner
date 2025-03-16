import { ResSpl } from '@chitin/res/impl/res-spl';
import { Spells } from '@views/sheet/components/spells/spells/spells';
import { Tooltip, TooltipData } from '@views/sheet/components/tooltips/tooltip';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle256TooltipData = TooltipData & {
  spellsHtml: string;
};

export class BuffSingle256Tooltip extends Tooltip {
  protected buffSingle256TooltipData: BuffSingle256TooltipData;

  constructor(resSpls: ResSpl[]) {
    super();

    const s = sheetdata;

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.hbs.buffSingle256Tooltip,
    );

    this.buffSingle256TooltipData = {
      ...this.tooltipData,
      spellsHtml: new Spells(resSpls).html,
    };

    this.html = compiled(this.buffSingle256TooltipData);
  }
}
