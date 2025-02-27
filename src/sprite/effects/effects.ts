import { Effect } from './effect';
import { Node } from './node';
import { PtrList } from './ptr-list';

export class Effects {
  private ptrList: PtrList;

  public effects: Effect[] = [];

  constructor(private base: bigint) {
    this.ptrList = new PtrList(base);
  }

  public run(): void {
    this.effects.length = 0;

    let node: Node = this.ptrList.head;

    for (let i: number = 0; i <= this.ptrList.count; i++) {
      this.effects.push(new Effect(node.data));

      node = new Node(node.next);
    }
  }
}
