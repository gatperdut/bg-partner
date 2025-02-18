import { BrowserWindow, ipcMain } from 'electron';
import { Sprite } from '../sprite/sprite';
import { eaTable } from '../tables/ea';
import { raceTable } from '../tables/race';
import { WindowCommon } from '../window/window-common';
import { SheetAPIOnInitializeParams } from './renderer';
import { spriteSanitize } from './sprite-filter';

declare const SHEET_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const SHEET_WINDOW_WEBPACK_ENTRY: string;

export class Sheet {
  private width: number = 400;

  private height: number = 700;

  public window: BrowserWindow;

  constructor(private windowHandler: WindowCommon, private sprite: Sprite, name: string) {
    this.window = new BrowserWindow({
      webPreferences: {
        preload: SHEET_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      frame: false,
      show: true,
      maximizable: false,
      focusable: false,
      skipTaskbar: true,
      hasShadow: false,
      transparent: false,
      resizable: false,
    });

    this.window.setContentSize(this.width, this.height);

    this.window.setSize(this.width, this.height);

    this.window.setMinimumSize(this.width, this.height);

    this.window.setShape([{ x: 0, y: 0, width: this.width, height: this.height }]);

    this.window.setAlwaysOnTop(true, 'screen-saver');

    this.window.loadURL(SHEET_WINDOW_WEBPACK_ENTRY);

    if (name && sprite.name.includes(name)) {
      // Opening devtools causes harmless (?) error: "Request Autofill.enable failed".
      this.window.webContents.openDevTools({ mode: 'detach' });
    }

    this.window.webContents.once('dom-ready', (): void => {
      this.update();
    });

    this.position();

    this.windowHandler.setForeground();

    ipcMain.on(`sheet.close.${sprite.id}`, (_event: Electron.IpcMainEvent): void => {
      this.teardown();
    });
  }

  public update(): void {
    const params: SheetAPIOnInitializeParams = {
      sprite: spriteSanitize(this.sprite),
      eaTable: eaTable,
      raceTable: raceTable,
    };

    this.window.webContents.send('sheet.initialize', params);
  }

  private position(): void {
    const rectWidth: number =
      this.windowHandler.windowRect.right - this.windowHandler.windowRect.left;

    const rectHeight: number =
      this.windowHandler.windowRect.bottom - this.windowHandler.windowRect.top;

    const spriteScreenX: number = Math.round(
      this.windowHandler.windowRect.left +
        (this.sprite.relativeX / this.sprite.viewportX) * rectWidth
    );

    const spriteScreenY: number = Math.round(
      this.windowHandler.windowRect.top +
        (this.sprite.relativeY / this.sprite.viewportY) * rectHeight
    );

    let sheetScreenX: number;

    let sheetScreenY: number;

    const sheetSize: number[] = this.window.getSize();

    // X
    const sheetPercentWidth: number = sheetSize[0] / rectWidth;

    const spritePercentX: number = (spriteScreenX - this.windowHandler.windowRect.left) / rectWidth;

    const marginPercentX = 50 / rectWidth;

    if (spritePercentX + sheetPercentWidth + marginPercentX > 0.95) {
      sheetScreenX = spriteScreenX - sheetSize[0] - 50;
    } else {
      sheetScreenX = spriteScreenX + 50;
    }

    // Y
    const sheetPercentHeight: number = sheetSize[1] / rectHeight;

    const spritePercentY: number = (spriteScreenY - this.windowHandler.windowRect.top) / rectHeight;

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

  public teardown(): void {
    ipcMain.removeAllListeners(`sheet.close.${this.sprite.id}`);

    this.window.destroy();

    this.window = null;
  }
}
