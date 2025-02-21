import Electron from 'electron';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';

export type WindowRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export abstract class WindowCommon {
  public id: number;

  public handle: HANDLE_PTR_TYPE;

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
