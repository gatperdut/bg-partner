import _ from 'lodash-es';
import { handlers } from '../../handlers';
import { effectTable } from '../../tables/effect';
import { Effect } from './effect';

export class Effects {
  public effects: Effect[] = [];

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

      this.effects.push(new Effect(effectPtr));

      nodePtr = handlers.memread.memReadBigint(nodePtr, 'ADDR');
    }

    if (!this.printed) {
      _.each(this.effects, (effect: Effect): void => {
        console.log(effectTable[effect.id]);
      });

      this.printed = true;
    }
  }
}
