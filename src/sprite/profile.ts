import { handlers } from '../handlers';

export class Profile {
  public enemyAlly: number;

  public race: number;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.enemyAlly = handlers.memread.memReadNumber(this.base + BigInt(0x38), 'BYTE');

    this.race = handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xa), 'BYTE');
  }
}
