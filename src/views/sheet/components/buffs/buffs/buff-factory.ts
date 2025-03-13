import { Eff } from '../../../../../sprite/effs/impl/eff';
import { Eff83 } from '../../../../../sprite/effs/impl/eff-83';
import { BuffGroup } from '../buff-group/buff-group';
import { BuffGroup102 } from '../buff-group/impl/buff-group-102/buff-group-102';
import { BuffGroup83 } from '../buff-group/impl/buff-group-83/buff-group-83';
import { BuffGroupStub } from '../buff-group/impl/buff-group-stub/buff-group-stub';
import { BuffSingle } from '../buff-single/buff-single';
import { BuffSingle159 } from '../buff-single/buff-single-159/buff-single-159';

export class BuffFactory {
  public static group(effs: Eff[]): BuffGroup {
    switch (effs[0].key) {
      case 83:
        return new BuffGroup83(effs as Eff83[]);
      case 102:
        return new BuffGroup102(effs);
      default:
        return new BuffGroupStub(effs);
    }
  }

  public static single(eff: Eff): BuffSingle {
    switch (eff.key) {
      case 159:
        return new BuffSingle159(eff);
      default:
        return new BuffSingle(eff);
    }
  }
}
