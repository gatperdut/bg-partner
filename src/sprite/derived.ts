import { handlers } from '../handlers';

export class Derived {
  public hpMax: number;

  public str: number;

  public strExc: number;

  public dex: number;

  public con: number;

  public int: number;

  public wis: number;

  public cha: number;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.hpMax = handlers.memread.memReadNumber(this.base + BigInt(0x4), 'INT16');

    this.str = handlers.memread.memReadNumber(this.base + BigInt(0x4e), 'INT16');

    this.strExc = handlers.memread.memReadNumber(this.base + BigInt(0x50), 'INT16');

    this.dex = handlers.memread.memReadNumber(this.base + BigInt(0x56), 'INT16');

    this.con = handlers.memread.memReadNumber(this.base + BigInt(0x58), 'INT16');

    this.int = handlers.memread.memReadNumber(this.base + BigInt(0x52), 'INT16');

    this.wis = handlers.memread.memReadNumber(this.base + BigInt(0x54), 'INT16');

    this.cha = handlers.memread.memReadNumber(this.base + BigInt(0x5a), 'INT16');
  }
}
