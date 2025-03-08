import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff83 } from '../../../../../../../sprite/effs/impl/eff-83';
import { SheetAPIUpdateParams } from '../../../../../renderer';
import { BuffGroup } from '../../buff-group';

export class BuffGroup83 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff83[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup102);

    const eff: Eff83 = this.effs[0];

    this.html = compiled({
      id: eff.id,
      image: eff.image,
      duration: Math.round((eff.duration - params.spriteView.basic.time) / 15),
      projImages: _.map(this.effs, (eff: Eff83): string => eff.projImage),
    });
  }
}
