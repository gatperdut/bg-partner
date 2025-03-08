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

    const eff: Eff = this.effs[0];

    this.html = compiled({
      id: eff.id,
      image: eff.image,
      duration: Math.round((eff.duration - params.spriteView.basic.time) / 15),
      max: Math.max(..._.map(this.effs, (eff: Eff): number => eff.param1)),
    });
  }
}
