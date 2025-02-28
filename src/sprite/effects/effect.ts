import { handlers } from '../../handlers';
import { effectTable } from '../../tables/effect';

export class Effect {
  public static invalidRegex: RegExp = /^(Graphics|Script)|Sound_Effect$/;

  public id: number;

  constructor(private base: bigint) {
    this.id = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x8), 'UINT32');
  }

  public invalid(): boolean {
    return Effect.invalidRegex.test(effectTable[this.id]);
  }
}
