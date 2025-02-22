import Electron from 'electron';
import { WindowLinux } from './window-linux';
import { WindowWin32 } from './window-win32';

export type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type Window = WindowLinux | WindowWin32;

export abstract class WindowOs {
  public id: number;

  public screen: Electron.Size = {
    width: 0,
    height: 0,
  };

  public rect: Rect = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  };

  public run(): void {
    const screenSize: Electron.Size = Electron.screen.getPrimaryDisplay().size;

    this.screen.width = screenSize.width;

    this.screen.height = screenSize.height;
  }

  public get rectWidth(): number {
    return this.rect.right - this.rect.left;
  }

  public get rectHeight(): number {
    return this.rect.bottom - this.rect.top;
  }
}
