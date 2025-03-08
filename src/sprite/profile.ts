import { handlers } from '../handlers';
import { EaKey } from '../tables/ea';

export class Profile {
  public enemyAlly: EaKey;

  public race: number;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.enemyAlly = handlers.memread.memReadNumber(this.base + BigInt(0x38), 'BYTE') as EaKey;

    this.race = handlers.memread.memReadNumber(this.base + BigInt(0x30 + 0xa), 'BYTE');
  }
}
