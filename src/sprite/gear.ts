import { handlers } from '@handlers';

export class Gear {
  constructor(private base: bigint) {
    this.run();
  }

  public run(): void {
    const selectedWeapon: number = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x138),
      'UINT8',
    );
  }
}
