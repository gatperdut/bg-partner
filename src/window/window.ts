import Electron from 'electron';
import { WindowLinux } from './window-linux';
import { WindowWin32 } from './window-win32';

export type Window = WindowLinux | WindowWin32;

export abstract class WindowOs {
  public id: number;

  public screen: Electron.Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  public window: Electron.Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  public run(): void {
    const display: Electron.Display = Electron.screen.getPrimaryDisplay();

    const screenSize: Electron.Size = Electron.screen.getPrimaryDisplay().size;

    this.screen.width = screenSize.width;

    this.screen.height = screenSize.height;
  }

  public get windowLeft(): number {
    return this.window.x;
  }

  public get windowTop(): number {
    return this.window.y;
  }
}
