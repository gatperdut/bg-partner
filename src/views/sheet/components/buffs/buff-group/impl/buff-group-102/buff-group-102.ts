import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../../../../../views/sheet/renderer';
import { BuffGroup } from '../../buff-group';

export class BuffGroup102 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup102);

    this.html = compiled({
      key: this.effs[0].key,
      image: this.effs[0].image.base64,
      duration: Math.round((this.effs[0].duration - params.timetracker.time) / 15),
      valign: Math.floor((32 - this.effs[0].image.size.height) / 2),
      max: Math.max(..._.map(this.effs, (eff: Eff): number => eff.param1)),
    });
  }
}
