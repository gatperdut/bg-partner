import Electron from 'electron';
import { VOIDPtr } from '../koffi/primitives';
import { WindowLinux } from './window-linux';
import { WindowWin32 } from './window-win32';

export type WindowRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type Window = WindowLinux | WindowWin32;

export abstract class WindowOs {
  public id: number;

  public handle: VOIDPtr;

  public screen: Electron.Size = {
    width: 0,
    height: 0,
  };

  public windowRect: WindowRect = {
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

  public setForeground(): void {
    // Empty
  }

  public teardown(): void {
    // Empty
  }
}
