import Handlebars from 'handlebars';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { sheetdata } from '../../../../../../../views/sheet/sheetdata';
import { BuffGroup } from '../../buff-group';

export class BuffGroupStub extends BuffGroup {
  constructor(effs: Eff[]) {
    super(effs[0].duration, effs[0].casterLevel, effs[0].spellLevel);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffGroupStub
    );

    this.html = compiled({});
  }
}
