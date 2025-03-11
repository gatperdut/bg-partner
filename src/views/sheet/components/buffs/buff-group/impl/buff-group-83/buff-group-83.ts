import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ResItm } from '../../../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff83 } from '../../../../../../../sprite/effs/impl/eff-83';
import { SheetAPIUpdateParams } from '../../../../../renderer';
import { BuffGroup, BuffGroupData } from '../../buff-group';

export type BuffGroup83Data = BuffGroupData & {
  proItmsWrap: string;
};

export class BuffGroup83 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff83[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup83);

    const proItms: ResItm[] = _.uniqBy(
      _.flatten(_.map(this.effs, (eff: Eff83): ResItm[] => eff.proItms)),
      (proItm: ResItm): string => proItm.code
    );

    const buffGroup83Data: BuffGroup83Data = {
      ...this.buffData,
      proItmsWrap: Handlebars.compile(this.components.buffGroup83ProItms)({
        proItms: proItms,
      }),
    };

    this.html = compiled(buffGroup83Data);
  }
}
