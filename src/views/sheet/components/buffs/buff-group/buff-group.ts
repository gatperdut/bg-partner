import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/eff';
import { SheetAPIUpdateParams } from '../../../renderer';

export abstract class BuffGroup {
  public html: string;

  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff[]
  ) {
    // Empty
  }
}
