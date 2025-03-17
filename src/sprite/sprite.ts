import { handlers } from '@handlers';
import { Basic } from '@sprite/basic';
import { Derived } from '@sprite/derived';
import { Effs } from '@sprite/effs/effs';
import { Profile } from '@sprite/profile';

export class Sprite {
  public basic: Basic;

  public profile: Profile;

  // TODO do we need any besides derivedBonus?
  public derived: Derived;

  public derivedBonus: Derived;

  public derivedTemp: Derived;

  private derivedOffset: bigint;

  private derivedTempOffset: bigint;

  private derivedBonusOffset: bigint;

  public effs: Effs;

  constructor(public base: bigint) {
    this.derivedOffset = base + BigInt(0x1120);

    this.derivedTempOffset = base + BigInt(0x1dc8 - (handlers.linux ? 0x8 : 0x0));

    this.derivedBonusOffset = base + BigInt(0x2a70 - (handlers.linux ? 0x10 : 0x0));

    this.basic = new Basic(base);

    this.profile = new Profile(base, this.derivedTempOffset);

    this.derived = new Derived(this.derivedOffset);

    this.derivedTemp = new Derived(this.derivedTempOffset);

    this.derivedBonus = new Derived(this.derivedBonusOffset);

    this.effs = new Effs(
      base + BigInt(0x4a00 - (handlers.linux ? 0x18 : 0)),
      base + BigInt(0x49b0 - (handlers.linux ? 0x18 : 0)),
    );
  }

  public invalid(): boolean {
    return (
      !this.basic.id ||
      this.basic.type !== 0x31 ||
      !this.basic.hp ||
      !this.basic.gameAreaAddr ||
      this.basic.pos.x < 0 ||
      this.basic.pos.y < 0 ||
      !this.basic.name ||
      !this.basic.resref ||
      !this.basic.canBeSeen
    );
  }

  public details(): void {
    this.profile.run();

    this.derived.run();

    this.derivedBonus.run();

    this.derivedTemp.run();

    this.effs.run();
  }

  public screen(): Electron.Point {
    return {
      x: Math.round(
        handlers.window.window.x +
          (this.basic.relative.x / this.basic.viewport.width) * handlers.window.window.width,
      ),
      y: Math.round(
        handlers.window.window.y +
          (this.basic.relative.y / this.basic.viewport.height) * handlers.window.window.height,
      ),
    };
  }
}
