import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../../../../../views/sheet/renderer';
import { BuffImage } from '../../../parts/buff-image/buff-image';
import { BuffRight } from '../../../parts/buff-right/buff-right';
import { BuffGroup, BuffGroupData } from '../../buff-group';

export type BuffGroup102Data = BuffGroupData & {
  rightHtml: string;
};

export class BuffGroup102 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup102);

    const max: number = Math.max(..._.map(this.effs, (eff: Eff): number => eff.param1));

    const buffGroup102Data: BuffGroup102Data = {
      ...this.buffData,
      imageHtml: new BuffImage(components, effs[0], effs[0].ressrc.name, null).html,
      rightHtml: new BuffRight(components, max, 'Maximum level').html,
    };

    this.html = compiled(buffGroup102Data);
  }
}
