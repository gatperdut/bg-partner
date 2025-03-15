import { Eff } from '@sprite/effs/impl/eff';
import { BuffGroup } from '@views/sheet/components/buffs/buff-group/buff-group';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export class BuffGroupStub extends BuffGroup {
  constructor(effs: Eff[]) {
    super(
      effs[0].duration,
      effs[0].casterLevel,
      effs[0].spellLevel,
      effs[0].school,
      effs[0].schoolShort,
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffGroupStub);

    this.html = compiled({});
  }
}
