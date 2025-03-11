import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Buff, BuffData } from '../buffs/buff';

export type BuffGroupData = BuffData;

export abstract class BuffGroup extends Buff {
  public html: string;

  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff[]
  ) {
    super(effs[0], params.timetracker.time);
  }
}
