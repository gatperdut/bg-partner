import Electron from 'electron';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';

export type WindowRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export abstract class WindowCommon {
  public windowId: number;

  public windowHandle: HANDLE_PTR_TYPE;

  public screenSize: Electron.Size = {
    width: 0,
    height: 0,
  };

  public windowRect: WindowRect = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  };

  public run(pid: number): void {
    const screenSize: Electron.Size = Electron.screen.getPrimaryDisplay().size;

    this.screenSize.width = screenSize.width;

    this.screenSize.height = screenSize.height;
  }

  public setForeground(): void {
    // Empty
  }

  public teardown(): void {
    // Empty
  }
}
