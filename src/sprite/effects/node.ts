import { handlers } from '../../handlers';

export class Node {
  private prev: bigint;

  public next: bigint;

  public data: bigint;

  constructor(private base: bigint) {
    this.prev = handlers.memread.memReadBigint(this.base, 'ADDR');

    this.next = handlers.memread.memReadBigint(this.base + BigInt(0x8), 'ADDR');

    this.data = handlers.memread.memReadBigint(this.base + BigInt(0x10), 'ADDR');
  }
}
