import { handlers } from '../../handlers';

export class Effect {
  public id: number;

  constructor(private base: bigint) {
    this.id = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x8), 'UINT32');
  }
}
