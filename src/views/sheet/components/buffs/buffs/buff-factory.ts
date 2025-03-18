import { Eff } from '@sprite/effs/impl/eff';
import { Eff232 } from '@sprite/effs/impl/eff-232';
import { Eff256 } from '@sprite/effs/impl/eff-256';
import { Eff83 } from '@sprite/effs/impl/eff-83';
import { BuffGroup } from '@views/sheet/components/buffs/buff-group/buff-group';
import { BuffGroup102 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-102/buff-group-102';
import { BuffGroup200 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-200/buff-group-200';
import { BuffGroup201 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-201/buff-group-201';
import { BuffGroup259 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-259/buff-group-259';
import { BuffGroup83 } from '@views/sheet/components/buffs/buff-group/impl/buff-group-83/buff-group-83';
import { BuffGroupStub } from '@views/sheet/components/buffs/buff-group/impl/buff-group-stub/buff-group-stub';
import { BuffSingle } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffSingle159 } from '@views/sheet/components/buffs/buff-single/buff-single-159/buff-single-159';
import { BuffSingle218 } from '@views/sheet/components/buffs/buff-single/buff-single-218/buff-single-218';
import { BuffSingle219 } from '@views/sheet/components/buffs/buff-single/buff-single-219/buff-single-219';
import { BuffSingle232 } from '@views/sheet/components/buffs/buff-single/buff-single-232/buff-single-232';
import { BuffSingle256 } from '@views/sheet/components/buffs/buff-single/buff-single-256/buff-single-256';
import { BuffSingle30 } from '@views/sheet/components/buffs/buff-single/buff-single-30/buff-single-30';
import { BuffSingle86 } from '@views/sheet/components/buffs/buff-single/buff-single-86/buff-single-86';
import { BuffSingle98 } from '@views/sheet/components/buffs/buff-single/buff-single-98/buff-single-98';
import { BuffGroup0 } from '../buff-group/impl/buff-group-0/buff-group-0';
import { BuffItem } from '../buff-item/buff-item';

export class BuffFactory {
  public static single(eff: Eff): BuffSingle {
    switch (eff.key) {
      case 30:
        return new BuffSingle30(eff);
      case 86:
        return new BuffSingle86(eff);
      case 98:
        return new BuffSingle98(eff);
      case 159:
        return new BuffSingle159(eff);
      case 218:
        return new BuffSingle218(eff);
      case 219:
        return new BuffSingle219(eff);
      case 232:
        return new BuffSingle232(eff as Eff232);
      case 256:
        return new BuffSingle256(eff as Eff256);
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
      case 200:
        return new BuffGroup200(effs);
      case 201:
        return new BuffGroup201(effs);
      case 259:
        return new BuffGroup259(effs);
      default:
        return new BuffGroupStub(effs);
    }
  }

  public static item(effs: Eff[]): BuffItem {
    return new BuffItem(effs);
  }
}
