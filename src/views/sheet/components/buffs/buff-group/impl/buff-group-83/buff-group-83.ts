import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff83, Eff83Pro } from '../../../../../../../sprite/effs/impl/eff-83';
import { SheetAPIUpdateParams } from '../../../../../renderer';
import { BuffGroup } from '../../buff-group';

export class BuffGroup83 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff83[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup83);

    const pros: Eff83Pro[] = _.flatten(_.map(this.effs, (eff: Eff83): Eff83Pro[] => eff.pros));

    this.html = compiled({
      id: this.effs[0].id,
      image: this.effs[0].image.base64,
      duration: Math.round((this.effs[0].duration - params.timetracker.time) / 15),
      valign: Math.floor((32 - this.effs[0].image.size.height) / 2),
      pros: Handlebars.compile(this.components.buffGroup83Pros)({
        pros: pros,
      }),
    });
  }
}
