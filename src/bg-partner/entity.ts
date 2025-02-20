import { TargetProcess } from './mem/mem-common';
import { Memread } from './memread/memread';
import { Sheet } from './sheet/sheet';
import { Sprite } from './sprite/sprite';
import { WindowCommon } from './window/window-common';

export class Entity {
  public loaded: boolean = false;

  private sheet: Sheet;

  public sprite: Sprite;

  constructor(
    private windowHandler: WindowCommon,
    private processHandle: TargetProcess,
    private gameObjectPtr: bigint,
    private memread: Memread
  ) {
    this.sprite = new Sprite(this.processHandle, this.gameObjectPtr, this.memread);

    this.loaded = !this.sprite.invalid;
  }

  public update(): void {
    this.sprite.basic();

    this.sprite.advanced();
  }

  public pointMatch(pointScreen: Electron.Point): boolean {
    const rectWidth: number =
      this.windowHandler.windowRect.right - this.windowHandler.windowRect.left;

    const rectHeight: number =
      this.windowHandler.windowRect.bottom - this.windowHandler.windowRect.top;

    const spriteScreenX: number = Math.round(
      this.windowHandler.windowRect.left +
        (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );

    const spriteScreenY: number = Math.round(
      this.windowHandler.windowRect.top +
        (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    if (this.sprite.name === 'Imoen') {
      console.log(pointScreen);

      console.log(Math.abs(spriteScreenX - pointScreen.x), Math.abs(spriteScreenY - pointScreen.y));
    }

    return (
      Math.abs(spriteScreenX - pointScreen.x) < 20 && Math.abs(spriteScreenY - pointScreen.y) < 20
    );
  }

  public sheetToggle(): void {
    if (this.sheet?.window) {
      this.sheet.teardown();
    } else {
      this.sheet = new Sheet(this.windowHandler, this.sprite, 'moe');
    }
  }
}
