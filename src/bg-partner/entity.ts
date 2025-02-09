import { EntitiesHandler } from './entities.handler';
import { HANDLE_PTR_TYPE } from './koffi/defs/handles';
import { RECT_TYPE } from './koffi/defs/structs/rect';
import { Sprite } from './sprite/sprite';
import { Tracker } from './tracker/tracker';
import { WindowHandler } from './window.handler';

export class Entity {
  public loaded: boolean = false;

  public sprite: Sprite;

  public tracker: Tracker;

  constructor(
    private entitiesHandler: EntitiesHandler,
    private windowHandler: WindowHandler,
    private processHandle: HANDLE_PTR_TYPE,
    private gameObjectPtr: number,
    private rect: RECT_TYPE
  ) {
    this.sprite = new Sprite(this.processHandle, this.gameObjectPtr);

    this.loaded = !this.sprite.invalid;
  }

  public createTracker(show: boolean): void {
    this.tracker = new Tracker(this.entitiesHandler, this.windowHandler, this.sprite, this.rect);

    this.tracker.init();

    if (show) {
      this.tracker.show();
    }
  }

  public update(): void {
    this.sprite.basic();

    this.sprite.advanced();

    this.tracker.track();
  }

  public teardown(): void {
    this.tracker.teardown();
  }

  public hideTracker(): void {
    this.tracker.hide();
  }

  public showTracker(): void {
    this.tracker.show();
  }
}
