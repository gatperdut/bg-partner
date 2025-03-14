import { Eff } from '@sprite/effs/impl/eff';
import { BuffGroup } from '@views/sheet/components/buffs/buff-group/buff-group';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export class BuffGroupStub extends BuffGroup {
  constructor(effs: Eff[]) {
    super(effs[0].duration, effs[0].casterLevel, effs[0].spellLevel);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffGroupStub
    );

    this.html = compiled({});
  }
}
