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
  protected buffGroup83TooltipData: BuffGroup83TooltipData;

  constructor(components: ComponentsRecord, effs: Eff83[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffGroup83Tooltip);

    const proItms: ResItm[] = _.uniqBy(
      _.flatten(_.map(effs, (eff: Eff83): ResItm[] => eff.proItms)),
      (proItm: ResItm): string => proItm.code
    );

    this.buffGroup83TooltipData = {
      ...this.tooltipData,
      itemsHtml: new Items(components, proItms).html,
    };

    this.html = compiled(this.buffGroup83TooltipData);
  }
}
