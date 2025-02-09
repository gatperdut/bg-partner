import { BrowserWindow, ipcMain } from 'electron';
import { SetForegroundWindow } from '../../koffi/defs/methods/windows';
import { RECT_TYPE } from '../../koffi/defs/structs/rect';
import { Sprite } from '../../sprite';
import { eaTable } from '../../tables/ea';
import { WindowHandler } from '../../window.handler';
import { windowInstantiate } from '../instantiate';
import { SheetAPIOnInitializeParams } from './renderer';
import { spriteSanitize } from './sprite-filter';

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
      400,
      700,
      false,
      sprite,
      name
    );

    this.window.webContents.once('dom-ready', (): void => {
      const params: SheetAPIOnInitializeParams = {
        sprite: spriteSanitize(this.sprite),
        eaTable: eaTable,
      };

      this.window.webContents.send('sheet.initialize', params);
    });

    ipcMain.on('sheet.open', (_event: Electron.IpcMainEvent, id: number): void => {
      if (this.sprite.id !== id) {
        return;
      }

      this.position();

      this.window.show();

      SetForegroundWindow(this.windowHandler.windowHandle);
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

    const spriteScreenX: number = Math.round(
      this.rect.left + (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );

    const spriteScreenY: number = Math.round(
      this.rect.top + (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    let sheetScreenX: number;

    let sheetScreenY: number;

    const sheetSize: number[] = this.window.getSize();

    // X
    const sheetPercentWidth: number = sheetSize[0] / rectWidth;

    const spritePercentX: number = (spriteScreenX - this.rect.left) / rectWidth;

    const marginPercentX = 50 / rectWidth;

    if (spritePercentX + sheetPercentWidth + marginPercentX > 0.95) {
      sheetScreenX = spriteScreenX - sheetSize[0] - 50;
    } else {
      sheetScreenX = spriteScreenX + 50;
    }

    // Y
    const sheetPercentHeight: number = sheetSize[1] / rectHeight;

    const spritePercentY: number = (spriteScreenY - this.rect.top) / rectHeight;

    const sheetPercentHalfHeight: number = sheetPercentHeight / 2;

    const sheetHalfHeight: number = sheetPercentHalfHeight * rectHeight;

    const sheetPercentTopOverflow: number = spritePercentY - sheetPercentHalfHeight - 0.05;

    const sheetPercentBottomOverflow: number = spritePercentY + sheetPercentHalfHeight - 0.95;

    if (sheetPercentTopOverflow < 0) {
      const sheetTopOverflow: number = Math.round(sheetPercentTopOverflow * rectHeight);

      sheetScreenY = spriteScreenY - sheetHalfHeight - sheetTopOverflow;
    } else if (sheetPercentBottomOverflow > 0) {
      const sheetBottomOverflow: number = Math.round(sheetPercentBottomOverflow * rectHeight);

      sheetScreenY = spriteScreenY - sheetHalfHeight - sheetBottomOverflow;
    } else {
      sheetScreenY = spriteScreenY - Math.round(sheetSize[1] / 2);
    }

    this.window.setPosition(sheetScreenX, sheetScreenY);
  }
}
