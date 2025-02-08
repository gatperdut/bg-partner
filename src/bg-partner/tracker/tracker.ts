import { BrowserWindow } from 'electron';
import { EntitiesHandler } from '../entities.handler';
import { SetForegroundWindow } from '../koffi/defs/methods/windows';
import { RECT_TYPE } from '../koffi/defs/structs/rect';
import { Sprite } from '../sprite';
import { WindowHandler } from '../window.handler';

declare const TRACKER_WINDOW_WEBPACK_ENTRY: string;

declare const TRACKER_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export class Tracker {
  private window: BrowserWindow;

  constructor(
    private entitiesHandler: EntitiesHandler,
    private windowHandler: WindowHandler,
    public sprite: Sprite,
    private rect: RECT_TYPE
  ) {
    // Empty
  }

  public init(): void {
    this.windowCreate();
  }

  public windowCreate(): void {
    this.window = new BrowserWindow({
      height: 30,
      width: 30,
      webPreferences: {
        preload: TRACKER_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      frame: false,
      show: false,
      skipTaskbar: true,
      hasShadow: false,
    });

    this.window.setAlwaysOnTop(true, 'screen-saver');

    this.window.loadURL(TRACKER_WINDOW_WEBPACK_ENTRY);
  }

  public track(): void {
    if (
      this.sprite.relativeX < 0 ||
      this.sprite.relativeX > this.sprite.viewportX ||
      this.sprite.relativeY < 0 ||
      this.sprite.relativeY > this.sprite.viewportY
    ) {
      if (this.window.isVisible()) {
        this.window.hide();
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

    this.window.setPosition(left, top);

    if (!this.window.isVisible() && this.entitiesHandler.trackersShown) {
      this.window.show();
    }
  }

  public teardown(): void {
    this.window.close();
  }

  public hide(): void {
    console.log('hide');
    this.window.hide();
  }

  public show(): void {
    console.log('show');
    this.window.show();
    this.window.focus();
  }

  private open(): void {
    console.log('open');
  }

  private close(): void {
    console.log('close');
  }

  public closedClick(): void {
    SetForegroundWindow(this.windowHandler.windowHandle);

    console.log(JSON.stringify(this.sprite));
  }
}
