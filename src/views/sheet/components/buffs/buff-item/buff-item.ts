import { Eff } from '@sprite/effs/impl/eff';
import { BuffItemTooltip } from '@views/sheet/components/buffs/buff-item/tooltip/buff-item-tooltip';
import { Buff, BuffData } from '@views/sheet/components/buffs/buff/buff';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffItemData = BuffData;

export class BuffItem extends Buff {
  protected buffItemData: BuffItemData;

  constructor(effs: Eff[]) {
    super(
      effs[0].duration,
      effs[0].durtype,
      effs[0].casterLevel,
      effs[0].spellLevel,
      effs[0].school,
      effs[0].schoolShort,
      effs[0].key,
      effs[0].name,
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffItem);

    const tooltipHtml: string = new BuffItemTooltip(effs).html;

    if (!tooltipHtml) {
      return;
    }

    this.buffItemData = {
      ...this.buffData,
      levelsHtml: effs[0].source === 'timed' ? this.buffData.levelsHtml : '',
      imageHtml: new Image(effs[0].resImageParent, effs[0].ressrcParent.name, tooltipHtml).html,
    };

    this.html = compiled(this.buffItemData);
  }
}
