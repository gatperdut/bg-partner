import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/eff';
import { SheetAPIUpdateParams } from '../../../../../views/sheet/renderer';
import { BuffGroup } from '../buff-group/buff-group';
import { BuffGroup102 } from '../buff-group/impl/buff-group-102/buff-group-102';
import { BuffGroupStub } from '../buff-group/impl/buff-group-stub/buff-group-stub';

export class BuffGroupFactory {
  public static create(
    id: number,
    components: ComponentsRecord,
    params: SheetAPIUpdateParams,
    effs: Eff[]
  ): BuffGroup {
    switch (id) {
      case 102:
        return new BuffGroup102(components, params, effs);
      default:
        return new BuffGroupStub(components, params, effs);
    }
  }
}
