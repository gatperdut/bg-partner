import { handlers } from '@handlers';
import { Basic } from '@sprite/basic';
import { Derived } from '@sprite/derived';
import { Effs } from '@sprite/effs/effs';
import { Profile } from '@sprite/profile';

export class Sprite {
  public basic: Basic;

  public profile: Profile;

  public derived: Derived;

  private derivedOffset: bigint;

  public effs: Effs;

  constructor(public base: bigint) {
    this.derivedOffset = base + BigInt(0x1120);

    this.basic = new Basic(base);

    this.profile = new Profile(base, this.derivedOffset);

    this.derived = new Derived(this.derivedOffset);

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
