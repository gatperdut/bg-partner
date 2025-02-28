import _ from 'lodash-es';
import { effectTable } from '../../tables/effect';
import { Effect } from './effect';
import { Node } from './node';
import { PtrList } from './ptr-list';

export class Effects {
  private ptrList: PtrList;

  public effects: Effect[] = [];

  constructor(private base: bigint) {
    // Empty
  }

  private printed: boolean = false;

  public run(): void {
    this.ptrList = new PtrList(this.base);

    this.effects.length = 0;

    let node: Node = this.ptrList.head;

    for (let i: number = 0; i < this.ptrList.count; i++) {
      const effect: Effect = new Effect(node.data());

      this.effects.push(effect);

      node = node.next;
    }

    if (!this.printed) {
      console.log(this.ptrList.count, 'effects');
      _.each(this.effects, (effect) => {
        console.log(effectTable[effect.id]);
      });
      this.printed = true;
    }
  }
}
