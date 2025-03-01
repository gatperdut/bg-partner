import { handlers } from '../../../handlers';
import { effectTable } from '../../../tables/effect';

export abstract class Effect {
  public param1: number;

  public param2: number;

  public param3: number;

  public param4: number;

  public param5: number;

  constructor(public id: number, protected base: bigint) {
    this.param1 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x14), 'INT32');

    this.param2 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x58), 'INT32');

    this.param3 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x5c), 'INT32');

    this.param4 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x60), 'INT32');

    this.param5 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x64), 'INT32');
  }

  public summary(): void {
    console.log(
      `${effectTable[this.id]} ${this.param1} ${this.param2} ${this.param3} ${this.param4} ${
        this.param5
      }`
    );
  }
}
