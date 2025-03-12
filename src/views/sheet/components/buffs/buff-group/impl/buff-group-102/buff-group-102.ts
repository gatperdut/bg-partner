import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../../../../../views/sheet/renderer';
import { BuffImage } from '../../../parts/buff-image/buff-image';
import { BuffGroup, BuffGroupData } from '../../buff-group';

export type BuffGroup102Data = BuffGroupData & {
  max: number;
};

export class BuffGroup102 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup102);

    const buffGroup102Data: BuffGroup102Data = {
      ...this.buffData,
      imageHtml: new BuffImage(components, effs[0], null).html,
      max: Math.max(..._.map(this.effs, (eff: Eff): number => eff.param1)),
    };

    this.html = compiled(buffGroup102Data);
  }
}
