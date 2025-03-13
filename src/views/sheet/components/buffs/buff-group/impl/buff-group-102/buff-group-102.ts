import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { Image } from '../../../../../../../views/sheet/components/image/image';
import { SheetAPIUpdateParams } from '../../../../../../../views/sheet/renderer';
import { BuffRight } from '../../../parts/buff-right/buff-right';
import { BuffGroup, BuffGroupData } from '../../buff-group';

export type BuffGroup102Data = BuffGroupData & {
  rightHtml: string;
};

export class BuffGroup102 extends BuffGroup {
  protected buffGroup102Data: BuffGroup102Data;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, effs: Eff[]) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup102);

    const max: number = Math.max(..._.map(effs, (eff: Eff): number => eff.param1));

    this.buffGroup102Data = {
      ...this.buffGroupData,
      imageHtml: new Image(components, effs[0].resImage, effs[0].ressrc.name, null).html,
      rightHtml: new BuffRight(components, max, 'Maximum level').html,
    };

    this.html = compiled(this.buffGroup102Data);
  }
}
