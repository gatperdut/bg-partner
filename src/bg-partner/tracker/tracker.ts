import { BrowserWindow } from 'electron';
import * as path from 'path';
import { EntitiesHandler } from '../entities.handler';
import { SetForegroundWindow } from '../koffi/defs/methods/windows';
import { RECT_TYPE } from '../koffi/defs/structs/rect';
import { Sprite } from '../sprite';
import { WindowHandler } from '../window.handler';

export class Tracker {
  private window: BrowserWindow;

  private isOpen: boolean = false;

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
      height: 50,
      width: 50,
      // webPreferences: {
      //   preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // },
      frame: false,
      skipTaskbar: true,
      alwaysOnTop: true,
    });

    this.window.loadFile(path.join(__dirname, './tracker.html'));
  }

  public track(): void {
    if (
      this.sprite.relativeX < 0 ||
      this.sprite.relativeX > this.sprite.viewportX ||
      this.sprite.relativeY < 0 ||
      this.sprite.relativeY > this.sprite.viewportY
    ) {
      // if (!this.window.isHidden()) {
      //   this.window.hide();
      // }

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

    // if (this.window.() && this.entitiesHandler.trackersShown) {
    //   this.window.show();
    // }
  }

  public teardown(): void {
    this.window.close();
  }

  public hide(): void {
    this.window.hide();
  }

  public show(): void {
    this.window.show();
  }

  private open(): void {
    console.log('open');
    this.isOpen = true;
  }

  private close(): void {
    console.log('close');
    this.isOpen = false;
  }

  public closedClick(): void {
    SetForegroundWindow(this.windowHandler.windowHandle);

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }

    console.log(JSON.stringify(this.sprite));
  }
}
