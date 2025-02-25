import { Sprite } from '../sprite/sprite';
import { Sheet } from '../views/sheet/sheet';

export class Entity {
  public loaded: boolean = false;

  private sheet: Sheet;

  public sprite: Sprite;

  constructor(private gameObjectPtr: bigint) {
    this.sprite = new Sprite(this.gameObjectPtr);

    this.loaded = !this.sprite.invalid();
  }

  public update(): void {
    this.sprite.basic.run();

    if (this.sheet?.window) {
      this.sprite.details();

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

  public teardown(): void {
    this.sheet?.teardown();
  }
}
