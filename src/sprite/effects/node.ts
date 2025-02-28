import { handlers } from '../../handlers';

export class Node {
  public nextPtr: bigint;

  public dataPtr: bigint;

  constructor(private base: bigint) {
    this.nextPtr = this.base;

    this.dataPtr = this.base + BigInt(0x10);
  }

  public next(): Node {
    return new Node(handlers.memread.memReadBigint(this.nextPtr, 'ADDR'));
  }

  public data(): bigint {
    return handlers.memread.memReadBigint(this.dataPtr, 'ADDR');
  }
}
