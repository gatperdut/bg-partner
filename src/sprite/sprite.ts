import { handlers } from '../handlers';
import { linux } from '../index';
import { Basic } from './basic';
import { Derived } from './derived';
import { Effects } from './effects/effects';
import { Profile } from './profile';

export class Sprite {
  public basic: Basic;

  public profile: Profile;

  public derived: Derived;

  public derivedBonus: Derived;

  public derivedTemp: Derived;

  public timedEffects: Effects;

  constructor(public base: bigint) {
    this.basic = new Basic(base);

    this.profile = new Profile(base);

    this.derived = new Derived(base + BigInt(0x1120));

    this.derivedBonus = new Derived(base + BigInt(0x2a70));

    this.derivedTemp = new Derived(base + BigInt(0x1dc8));

    this.timedEffects = new Effects(base + BigInt(0x4a00 - (linux ? 0x18 : 0)));
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

    this.timedEffects.run();
  }

  public screen(): Electron.Point {
    return {
      x: Math.round(
        handlers.window.window.x +
          (this.basic.relative.x / this.basic.viewport.width) * handlers.window.window.width
      ),
      y: Math.round(
        handlers.window.window.y +
          (this.basic.relative.y / this.basic.viewport.height) * handlers.window.window.height
      ),
    };
  }
}
