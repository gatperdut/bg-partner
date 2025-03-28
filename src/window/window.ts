import { config, handlers } from '@handlers';
import { WindowLinux } from '@window/window-linux';
import { WindowWin32 } from '@window/window-win32';
import * as Electron from 'electron';
import _ from 'lodash';

export type Window = WindowLinux | WindowWin32;

export abstract class WindowOs {
  public id: number;

  public display: Electron.Rectangle;

  public window: Electron.Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  public focusedLast: boolean = null;

  constructor() {
    const index: number = config().obj.display;

    if (_.isNull(index)) {
      this.use(Electron.screen.getPrimaryDisplay().bounds, null);
      return;
    }

    const displays: Electron.Display[] = Electron.screen.getAllDisplays();

    if (index > displays.length - 1) {
      console.log(`Display with index ${index} not found. Will revert to primary display.`);

      this.use(Electron.screen.getPrimaryDisplay().bounds, null);

      return;
    }

    this.use(displays[index].bounds, index);
  }

  private use(display: Electron.Rectangle, index: number): void {
    this.display = display;

    console.log(
      `${_.isNull(index) ? 'Primary display' : `Display #${index}`}: ${display.width}x${
        display.height
      }, offset (${display.x}, ${display.y}).`,
    );
  }

  protected focusChanged(focused: boolean): void {
    handlers.entities.focusChanged(focused);

    handlers.shortcuts.focusChanged(focused);
  }
}
