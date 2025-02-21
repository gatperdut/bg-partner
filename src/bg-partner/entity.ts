import { handlers } from './main';
import { Memread } from './memread/memread';
import { TargetProcess } from './memscan/memscan-common';
import { Sheet } from './sheet/sheet';
import { Sprite } from './sprite/sprite';

export class Entity {
  public loaded: boolean = false;

  private sheet: Sheet;

  public sprite: Sprite;

  constructor(
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
    const rectWidth: number = handlers.window.windowRect.right - handlers.window.windowRect.left;

    const rectHeight: number = handlers.window.windowRect.bottom - handlers.window.windowRect.top;

    const spriteScreenX: number = Math.round(
      handlers.window.windowRect.left + (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );

    const spriteScreenY: number = Math.round(
      handlers.window.windowRect.top + (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    return (
      Math.abs(spriteScreenX - pointScreen.x) < 20 && Math.abs(spriteScreenY - pointScreen.y) < 20
    );
  }

  public sheetToggle(): void {
    if (this.sheet?.window) {
      this.sheet.teardown();
    } else {
      this.sheet = new Sheet(this.sprite, 'moe');
    }
  }
}
