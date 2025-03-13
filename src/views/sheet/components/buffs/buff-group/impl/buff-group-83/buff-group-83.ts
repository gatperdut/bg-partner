import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff83 } from '../../../../../../../sprite/effs/impl/eff-83';
import { Image } from '../../../../../../../views/sheet/components/image/image';
import { SheetAPIUpdateParams } from '../../../../../renderer';
import { BuffGroup, BuffGroupData } from '../../buff-group';
import { BuffGroup83Tooltip } from './tooltips/buff-group-83-tooltip';

export type BuffGroup83Data = BuffGroupData;

export class BuffGroup83 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff83[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup83);

    const tooltip: string = new BuffGroup83Tooltip(components, effs).html;

    const buffGroup83Data: BuffGroup83Data = {
      ...this.buffData,
      imageHtml: new Image(components, effs[0].resImage, effs[0].ressrc.name, tooltip).html,
    };

    this.html = compiled(buffGroup83Data);
  }
}
