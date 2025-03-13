import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ResItm } from '../../../../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../../../../../../../components/components';
import { Eff83 } from '../../../../../../../../sprite/effs/impl/eff-83';
import { Items } from '../../../../../../../../views/sheet/components/items/items/items';
import {
  Tooltip,
  TooltipData,
} from '../../../../../../../../views/sheet/components/tooltips/tooltip';

export type BuffGroup83TooltipData = TooltipData & {
  itemsHtml: string;
};

export class BuffGroup83Tooltip extends Tooltip {
  constructor(components: ComponentsRecord, protected effs: Eff83[]) {
    super(components);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      this.components.buffGroup83Tooltip
    );

    const proItms: ResItm[] = _.uniqBy(
      _.flatten(_.map(this.effs, (eff: Eff83): ResItm[] => eff.proItms)),
      (proItm: ResItm): string => proItm.code
    );

    const buffGroup83TooltipData: BuffGroup83TooltipData = {
      itemsHtml: new Items(components, proItms).html,
    };

    this.html = compiled(buffGroup83TooltipData);
  }
}
