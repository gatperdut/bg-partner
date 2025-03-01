import _ from 'lodash-es';
import { handlers } from '../../handlers';
import { effectTable } from '../../tables/effect';
import { EffectFactory } from './effect-factory';
import { Effect } from './impl/effect';

export class Effects {
  public effects: Effect[] = [];

  private effectFactory: EffectFactory = new EffectFactory();

  public static invalidRegex: RegExp = /^(Graphics|Script)|Sound_Effect$/;

  constructor(private base: bigint) {
    // Empty
  }

  private printed: boolean = false;

  public run(): void {
    this.effects.length = 0;

    const count: number = handlers.memread.memReadNumber(this.base + BigInt(0x18), 'INT32');

    let nodePtr: bigint = handlers.memread.memReadBigint(this.base + BigInt(0x8), 'ADDR');

    for (let i: number = 0; i < count; i++) {
      const effectPtr: bigint = handlers.memread.memReadBigint(nodePtr + BigInt(0x10), 'ADDR');

      const id: number = handlers.memread.memReadNumber(effectPtr + BigInt(0x8 + 0x8), 'UINT32');

      if (this.invalid(id)) {
        continue;
      }

      const effect: Effect = this.effectFactory.create(id, effectPtr);

      this.effects.push(effect);

      nodePtr = handlers.memread.memReadBigint(nodePtr, 'ADDR');
    }

    if (!this.printed) {
      _.each(this.effects, (effect: Effect): void => {
        effect.summary();
      });

      this.printed = true;
    }
  }

  public invalid(id: number): boolean {
    return Effects.invalidRegex.test(effectTable[id]);
  }
}
