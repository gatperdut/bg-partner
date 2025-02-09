import { EntitiesHandler } from '../entities.handler';
import { RECT_TYPE } from '../koffi/defs/structs/rect';
import { Sprite } from '../sprite/sprite';
import { WindowHandler } from '../window.handler';
import { Eye } from './eye/eye';
import { Sheet } from './sheet/sheet';

export class Tracker {
  private eye: Eye;

  private sheet: Sheet;

  constructor(
    private entitiesHandler: EntitiesHandler,
    private windowHandler: WindowHandler,
    public sprite: Sprite,
    private rect: RECT_TYPE
  ) {
    // Empty
  }

  public init(): void {
    this.eye = new Eye(this.windowHandler, this.sprite, null);

    this.sheet = new Sheet(this.windowHandler, this.sprite, this.rect, 'moe');
  }

  public track(): void {
    if (
      this.sprite.relativeX < 0 ||
      this.sprite.relativeX > this.sprite.viewportX ||
      this.sprite.relativeY < 0 ||
      this.sprite.relativeY > this.sprite.viewportY
    ) {
      if (this.eye.windowActive && this.eye.window.isVisible()) {
        this.eye.hide();
      }

      return;
    }

    const rectWidth: number = this.rect.right - this.rect.left;

    const rectHeight: number = this.rect.bottom - this.rect.top;

    const leftEye: number = Math.round(
      this.rect.left + (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );
    const topEye: number = Math.round(
      this.rect.top + (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    this.eye.windowActive && this.eye.window.setPosition(leftEye, topEye);

    if (
      !(this.eye.windowActive && this.eye.window.isVisible()) &&
      !this.eye.sheetShown &&
      this.entitiesHandler.trackersShown
    ) {
      this.eye.show();
    }

    this.sheet.update();
  }

  public teardown(): void {
    this.eye.teardown();

    this.sheet.teardown();
  }

  public hide(): void {
    this.eye.hide();

    this.sheet.hide();
  }

  public show(): void {
    this.eye.show();
  }
}
