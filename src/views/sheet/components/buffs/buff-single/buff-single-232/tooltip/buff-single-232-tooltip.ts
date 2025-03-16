import { ResSpl } from '@chitin/res/impl/res-spl';
import { Spells } from '@views/sheet/components/spells/spells/spells';
import { Tooltip, TooltipData } from '@views/sheet/components/tooltips/tooltip';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSingle232TooltipData = TooltipData & {
  spellsHtml: string;
};

export class BuffSingle232Tooltip extends Tooltip {
  protected buffSingle232TooltipData: BuffSingle232TooltipData;

  constructor(resSpl: ResSpl) {
    super();

    const s = sheetdata;

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.hbs.buffSingle232Tooltip,
    );

    this.buffSingle232TooltipData = {
      ...this.tooltipData,
      spellsHtml: new Spells([resSpl]).html,
    };

    this.html = compiled(this.buffSingle232TooltipData);
  }
}
