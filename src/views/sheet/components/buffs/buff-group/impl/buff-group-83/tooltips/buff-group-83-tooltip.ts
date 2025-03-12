import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ResItm } from '../../../../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../../../../../../../components/components';
import { Eff83 } from '../../../../../../../../sprite/effs/impl/eff-83';
import {
  Tooltip,
  TooltipData,
} from '../../../../../../../../views/sheet/components/tooltips/tooltip';

export type BuffGroup83TooltipData = TooltipData & {
  proItms: ResItm[];
};

export class BuffGroup83Tooltip extends Tooltip {
  constructor(protected components: ComponentsRecord, protected effs: Eff83[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      this.components.buffGroup83Tooltip
    );

    const proItms: ResItm[] = _.uniqBy(
      _.flatten(_.map(this.effs, (eff: Eff83): ResItm[] => eff.proItms)),
      (proItm: ResItm): string => proItm.code
    );

    const buffGroup83TooltipData: BuffGroup83TooltipData = {
      proItms: proItms,
    };

    this.html = compiled(buffGroup83TooltipData);
  }
}
