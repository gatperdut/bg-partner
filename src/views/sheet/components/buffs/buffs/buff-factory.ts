import { Eff } from '@sprite/effs/impl/eff';
import { Eff83 } from '@sprite/effs/impl/eff-83';
import { BuffGroup } from '@views/sheet/components/buffs/buff-group/buff-group';
import { BuffGroup102 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-102/buff-group-102';
import { BuffGroup83 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-83/buff-group-83';
import { BuffGroupStub } from '@views/sheet/components/buffs/buff-group/impl/buff-group-stub/buff-group-stub';
import { BuffSingle } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffSingle159 } from '@views/sheet/components/buffs/buff-single/buff-single-159/buff-single-159';
import { BuffSingle30 } from '@views/sheet/components/buffs/buff-single/buff-single-30/buff-single-30';
import { BuffGroup0 } from '../buff-group/impl/buff-group-0/buff-group-0';
import { BuffItem } from '../buff-item/buff-item';

export class BuffFactory {
  public static single(eff: Eff): BuffSingle {
    switch (eff.key) {
      case 30:
        return new BuffSingle30(eff);
      case 159:
        return new BuffSingle159(eff);
      default:
        return new BuffSingle(eff);
    }
  }

  public static group(effs: Eff[]): BuffGroup {
    switch (effs[0].key) {
      case 0:
        return new BuffGroup0(effs);
      case 83:
        return new BuffGroup83(effs as Eff83[]);
      case 102:
        return new BuffGroup102(effs);
      default:
        return new BuffGroupStub(effs);
    }
  }

  public static item(effs: Eff[]): BuffItem {
    return new BuffItem(effs);
  }
}
