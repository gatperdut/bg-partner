import { Eff83 } from '@sprite/effs/impl/eff-83';
import { BuffGroup, BuffGroupData } from '@views/sheet/components/buffs/buff-group/buff-group';
import { BuffGroup83Tooltip } from '@views/sheet/components/buffs/buff-group/impl/buff-group-83/tooltip/buff-group-83-tooltip';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffGroup83Data = BuffGroupData;

export class BuffGroup83 extends BuffGroup {
  protected buffGroup83Data: BuffGroup83Data;

  constructor(effs: Eff83[]) {
    super(
      effs[0].duration,
      effs[0].casterLevel,
      effs[0].spellLevel,
      effs[0].school,
      effs[0].schoolShort,
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffGroup83);

    const tooltipHtml: string = new BuffGroup83Tooltip(effs).html;

    this.buffGroup83Data = {
      ...this.buffGroupData,
      imageHtml: new Image(effs[0].resImage, effs[0].ressrc.name, tooltipHtml).html,
    };

    this.html = compiled(this.buffGroup83Data);
  }
}
