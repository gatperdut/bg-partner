import { Buff, BuffData } from '../buff/buff';

export type BuffGroupData = BuffData;

export abstract class BuffGroup extends Buff {
  protected buffGroupData: BuffGroupData;

  constructor(duration: number, casterLevel: number, spellLevel: number) {
    super(duration, casterLevel, spellLevel);

    this.buffGroupData = {
      ...this.buffData,
    };
  }
}
