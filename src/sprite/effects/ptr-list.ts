import { handlers } from '../../handlers';
import { Node } from './node';

export class PtrList {
  public head: Node;

  private tail: Node;

  public count: number;

  constructor(private base: bigint) {
    this.head = new Node(this.base + BigInt(0x8));

    this.tail = new Node(this.base + BigInt(0x10));

    // this.head = new Node(this.base + BigInt(0x10));

    // this.tail = new Node(this.base + BigInt(0x30));

    this.count = handlers.memread.memReadNumber(this.base + BigInt(0x18), 'INT32');
  }
}
