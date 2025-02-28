import { handlers } from '../../handlers';

export class Node {
  public nextPtr: bigint;

  public dataPtr: bigint;

  public next: Node;

  constructor(private base: bigint) {
    this.nextPtr = this.base;

    if (this.nextPtr) {
      this.next = new Node(handlers.memread.memReadBigint(this.nextPtr, 'ADDR'));
    }

    this.dataPtr = this.base + BigInt(0x10);
  }

  public data(): bigint {
    return handlers.memread.memReadBigint(this.dataPtr, 'ADDR');
  }
}
