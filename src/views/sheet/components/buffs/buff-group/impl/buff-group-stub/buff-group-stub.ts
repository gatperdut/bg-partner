import { Eff } from '@sprite/effs/impl/eff';
import { effTab } from '@tables/eff';
import { BuffGroup, BuffGroupData } from '@views/sheet/components/buffs/buff-group/buff-group';
import { BuffGroupStubTooltip } from '@views/sheet/components/buffs/buff-group/impl/buff-group-stub/tooltip/buff-group-stub-tooltip';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffGroupStubData = BuffGroupData;

export class BuffGroupStub extends BuffGroup {
  protected buffGroupStubData: BuffGroupStubData;

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

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffGroupStub);

    const tooltipHtml: string = new BuffGroupStubTooltip(effs).html;

    this.buffGroupStubData = {
      ...this.buffGroupData,
      imageHtml: new Image(
        effs[0].resImage,
        effs[0].ressrc.name || effTab[effs[0].key],
        tooltipHtml,
      ).html,
    };

    this.html = compiled(this.buffGroupStubData);
  }
}
