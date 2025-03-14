import { handlers } from '@handlers';
import { Sprite } from '@sprite/sprite';
import { Sheet } from '@views/sheet/sheet';

export class Entity {
  public loaded: boolean = false;

  private sheet: Sheet;

  public sprite: Sprite;

  public updatedOnce: boolean = false;

  constructor(private gameObjectPtr: bigint) {
    this.sprite = new Sprite(this.gameObjectPtr);

    this.loaded = !this.sprite.invalid();
  }

  public get windowValid(): boolean {
    return this.sheet?.window && !this.sheet.window.isDestroyed() && this.sheet.window.isVisible();
  }

  public update(): void {
    this.sprite.basic.run();

    if (this.windowValid) {
      if (handlers.timetracker.running || !this.updatedOnce) {
        this.sprite.details();

        this.updatedOnce = true;
      }

      this.sheet.update();
    }
  }

  public pointMatch(pointScreen: Electron.Point): boolean {
    const spritePoint: Electron.Point = this.sprite.screen();

    return (
      Math.abs(spritePoint.x - pointScreen.x) < 20 && Math.abs(spritePoint.y - pointScreen.y) < 20
    );
  }

  public sheetToggle(): void {
    if (this.sheet?.window) {
      this.sheet.teardown();
    } else {
      this.sheet = new Sheet(this.sprite);
    }
  }

  public focusChanged(focused: boolean): void {
    this.sheet?.focusChanged(focused);
  }

  public teardown(): void {
    this.sheet?.teardown();
  }
}
