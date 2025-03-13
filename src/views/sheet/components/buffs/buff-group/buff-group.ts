import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Buff, BuffData } from '../buff/buff';

export type BuffGroupData = BuffData;

export abstract class BuffGroup extends Buff {
  protected buffGroupData: BuffGroupData;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams, effs: Eff[]) {
    super(components, effs[0], params.timetracker.time);

    this.buffGroupData = {
      ...this.buffData,
    };
  }
}
