import { handlers } from '../../handlers';

export class Effect {
  public id: number;

  constructor(private base: bigint) {
    this.id = handlers.memread.memReadNumber(this.base + BigInt(0x8), 'UINT32');

    if (this.id) {
      console.log('effect id', this.id);
    }
  }
}
