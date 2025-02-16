import { HANDLE_PTR_TYPE } from './koffi/defs/handles';
import { Sheet } from './sheet/sheet';
import { Sprite } from './sprite/sprite';
import { WindowHandler } from './window.handler';

export class Entity {
  public loaded: boolean = false;

  private sheet: Sheet;

  public sprite: Sprite;

  constructor(
    private windowHandler: WindowHandler,
    private processHandle: HANDLE_PTR_TYPE,
    private gameObjectPtr: number
  ) {
    this.sprite = new Sprite(this.processHandle, this.gameObjectPtr);

    this.loaded = !this.sprite.invalid;
  }

  public update(): void {
    this.sprite.basic();

    this.sprite.advanced();
  }

  public pointMatch(pointScreen: Electron.Point): boolean {
    const rectWidth: number = this.windowHandler.rect.right - this.windowHandler.rect.left;

    const rectHeight: number = this.windowHandler.rect.bottom - this.windowHandler.rect.top;

    const spriteScreenX: number = Math.round(
      this.windowHandler.rect.left + (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );

    const spriteScreenY: number = Math.round(
      this.windowHandler.rect.top + (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    return (
      Math.abs(spriteScreenX - pointScreen.x) < 20 && Math.abs(spriteScreenY - pointScreen.y) < 20
    );
  }

  public sheetToggle(): void {
    if (this.sheet?.window) {
      this.sheet.teardown();
    } else {
      this.sheet = new Sheet(this.windowHandler, this.sprite, this.windowHandler.rect, 'moe');
    }
  }
}
