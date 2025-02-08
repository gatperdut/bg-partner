import { EntitiesHandler } from '../entities.handler';
import { RECT_TYPE } from '../koffi/defs/structs/rect';
import { Sprite } from '../sprite';
import { WindowHandler } from '../window.handler';
import { Eye } from './eye/eye';

export class Tracker {
  private eye: Eye;

  constructor(
    private entitiesHandler: EntitiesHandler,
    private windowHandler: WindowHandler,
    public sprite: Sprite,
    private rect: RECT_TYPE
  ) {
    // Empty
  }

  public init(): void {
    this.eye = new Eye(this.windowHandler, this.sprite);
  }

  public track(): void {
    if (!this.eye) {
      return;
    }

    if (
      this.sprite.relativeX < 0 ||
      this.sprite.relativeX > this.sprite.viewportX ||
      this.sprite.relativeY < 0 ||
      this.sprite.relativeY > this.sprite.viewportY
    ) {
      if (this.eye.window.isVisible()) {
        this.eye.window.hide();
      }

      return;
    }

    const rectWidth: number = this.rect.right - this.rect.left;

    const rectHeight: number = this.rect.bottom - this.rect.top;

    const left = Math.round(
      this.rect.left + (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );
    const top = Math.round(
      this.rect.top + (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    this.eye.window.setPosition(left, top);

    if (!this.eye.window.isVisible() && this.entitiesHandler.trackersShown) {
      this.eye.window.show();
    }
  }

  public teardown(): void {
    this.eye.window.close();
  }

  public hide(): void {
    console.log('hide');
    this.eye.window.hide();
  }

  public show(): void {
    console.log('show');
    this.eye.window.show();
    this.eye.window.focus();
  }
}
