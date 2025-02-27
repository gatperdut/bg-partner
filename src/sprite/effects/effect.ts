import { handlers } from '../../handlers';

export class Effect {
  public id: number;

  constructor(private base: bigint) {
    const addr = handlers.memread.memReadBigint(this.base + BigInt(0x8), 'ADDR');

    this.id = handlers.memread.memReadNumber(addr + BigInt(0x8), 'UINT32');

    if (this.id) {
      console.log('effect id', this.id);
    }
  }
}
