import { BrowserWindow, ipcMain } from 'electron';
import { SetForegroundWindow } from '../../koffi/defs/methods/windows';
import { RECT_TYPE } from '../../koffi/defs/structs/rect';
import { Sprite } from '../../sprite';
import { WindowHandler } from '../../window.handler';
import { windowInstantiate } from '../instantiate';

declare const SHEET_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const SHEET_WINDOW_WEBPACK_ENTRY: string;

export class Sheet {
  public window: BrowserWindow;

  constructor(
    private windowHandler: WindowHandler,
    private sprite: Sprite,
    private rect: RECT_TYPE,
    name: string
  ) {
    this.window = windowInstantiate(
      SHEET_WINDOW_PRELOAD_WEBPACK_ENTRY,
      SHEET_WINDOW_WEBPACK_ENTRY,
      200,
      300,
      false,
      sprite,
      name
    );

    this.window.webContents.once('dom-ready', (): void => {
      this.window.webContents.send('initialize', { id: this.sprite.id, name: this.sprite.name });
    });

    ipcMain.on('sheet.open', (_event: Electron.IpcMainEvent, id: number): void => {
      if (this.sprite.id !== id) {
        return;
      }

      this.position();

      this.window.show();

      setTimeout((): void => {
        SetForegroundWindow(this.windowHandler.windowHandle);
      }, 500);
    });

    ipcMain.on('sheet.close', (_event: Electron.IpcMainEvent, id: number): void => {
      if (this.sprite.id !== id) {
        return;
      }

      this.window.hide();
    });
  }

  private position(): void {
    const rectWidth: number = this.rect.right - this.rect.left;

    const rectHeight: number = this.rect.bottom - this.rect.top;

    const leftSheet =
      Math.round(this.rect.left + (this.sprite.relativeX / this.sprite.viewportX) * rectWidth) +
      100;
    const topSheet = Math.round(
      this.rect.top +
        (this.sprite.relativeY / this.sprite.viewportY) * rectHeight -
        this.window.getSize()[1] / 2
    );

    this.window.setPosition(leftSheet, topSheet);
  }
}
