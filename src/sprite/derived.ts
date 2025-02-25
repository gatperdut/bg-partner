import { handlers } from '../handlers';

export class Derived {
  public hpMax: number;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.hpMax = handlers.memread.memReadNumber(this.base + BigInt(0x4), 'INT16');
  }
}
