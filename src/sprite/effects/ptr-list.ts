import { handlers } from '../../handlers';
import { Node } from './node';

export class PtrList {
  public head: Node;

  public count: number;

  constructor(private base: bigint) {
    this.head = new Node(handlers.memread.memReadBigint(this.base + BigInt(0x8), 'ADDR'));

    this.count = handlers.memread.memReadNumber(this.base + BigInt(0x18), 'INT32');
  }
}
