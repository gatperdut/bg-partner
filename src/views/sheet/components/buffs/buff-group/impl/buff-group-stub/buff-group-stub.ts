import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../../../renderer';
import { BuffGroup } from '../../buff-group';

export class BuffGroupStub extends BuffGroup {
  constructor(
    components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffGroupStub);

    this.html = compiled({});
  }
}
