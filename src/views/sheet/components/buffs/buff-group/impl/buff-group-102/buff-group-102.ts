import { Eff } from '@sprite/effs/impl/eff';
import { effTab } from '@tables/eff';
import { BuffGroup, BuffGroupData } from '@views/sheet/components/buffs/buff-group/buff-group';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffGroup102Data = BuffGroupData & {
  rightHtml: string;
};

export class BuffGroup102 extends BuffGroup {
  protected buffGroup102Data: BuffGroup102Data;

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

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffGroup102);

    const max: number = Math.max(..._.map(effs, (eff: Eff): number => eff.param1));

    this.buffGroup102Data = {
      ...this.buffGroupData,
      imageHtml: new Image(effs[0].resImage, effs[0].ressrc.name || effTab[effs[0].key], null).html,
      rightHtml: new BuffRight(max.toString(), 'Maximum spell level').html,
    };

    this.html = compiled(this.buffGroup102Data);
  }
}
