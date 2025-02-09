import { BrowserWindow, ipcMain } from 'electron';
import { SetForegroundWindow } from '../../koffi/defs/methods/windows';
import { Sprite } from '../../sprite';
import { WindowHandler } from '../../window.handler';
import { windowInstantiate } from '../instantiate';

declare const EYE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const EYE_WINDOW_WEBPACK_ENTRY: string;

export class Eye {
  public window: BrowserWindow;

  public sheetShown: boolean = false;

  constructor(private windowHandler: WindowHandler, private sprite: Sprite, name: string) {
    this.window = windowInstantiate(
      EYE_WINDOW_PRELOAD_WEBPACK_ENTRY,
      EYE_WINDOW_WEBPACK_ENTRY,
      23,
      20,
      true,
      sprite,
      name
    );

    this.window.webContents.once('dom-ready', (): void => {
      this.window.webContents.send('eye.initialize', {
        id: this.sprite.id,
        name: this.sprite.name,
      });
    });

    ipcMain.on('sheet.open', (_event: Electron.IpcMainEvent, id: number): void => {
      if (this.sprite.id !== id) {
        return;
      }

      this.sheetShown = true;

      this.window.hide();
    });

    ipcMain.on('sheet.close', (_event: Electron.IpcMainEvent, id: number): void => {
      if (this.sprite.id !== id) {
        return;
      }

      this.sheetShown = false;

      SetForegroundWindow(this.windowHandler.windowHandle);

      this.window.show();
    });
  }
}
