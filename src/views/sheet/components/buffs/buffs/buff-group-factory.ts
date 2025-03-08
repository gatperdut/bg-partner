import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { Eff83 } from '../../../../../sprite/effs/impl/eff-83';
import { SheetAPIUpdateParams } from '../../../../../views/sheet/renderer';
import { BuffGroup } from '../buff-group/buff-group';
import { BuffGroup102 } from '../buff-group/impl/buff-group-102/buff-group-102';
import { BuffGroup83 } from '../buff-group/impl/buff-group-83/buff-group-83';
import { BuffGroupStub } from '../buff-group/impl/buff-group-stub/buff-group-stub';

export class BuffGroupFactory {
  public static create(
    id: number,
    components: ComponentsRecord,
    params: SheetAPIUpdateParams,
    effs: Eff[]
  ): BuffGroup {
    switch (id) {
      case 83:
        return new BuffGroup83(components, params, effs as Eff83[]);
      case 102:
        return new BuffGroup102(components, params, effs);
      default:
        return new BuffGroupStub(components, params, effs);
    }
  }
}
