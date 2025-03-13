import { ComponentsRecord } from '../../../../../components/components';
import { Buff, BuffData } from '../buff/buff';

export type BuffGroupData = BuffData;

export abstract class BuffGroup extends Buff {
  protected buffGroupData: BuffGroupData;

  constructor(
    components: ComponentsRecord,
    duration: number,
    casterLevel: number,
    spellLevel: number,
    time: number
  ) {
    super(components, duration, casterLevel, spellLevel, time);

    this.buffGroupData = {
      ...this.buffData,
    };
  }
}
