import { BrowserWindow, ipcMain } from 'electron';
import { handlers } from '../handlers';
import { Sprite } from '../sprite/sprite';
import { eaTable } from '../tables/ea';
import { raceTable } from '../tables/race';
import { SheetAPIOnUpdateParams } from './renderer';
import { spriteSanitize } from './sprite-filter';

declare const SHEET_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const SHEET_WINDOW_WEBPACK_ENTRY: string;

export class Sheet {
  private width: number = 400;

  private height: number = 700;

  public window: BrowserWindow;

  constructor(private sprite: Sprite) {
    const position: Electron.Point = this.position();

    this.window = new BrowserWindow({
      x: position.x,
      y: position.y,
      width: this.width,
      height: this.height,
      minWidth: this.width,
      minHeight: this.height,
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

    this.window.setAlwaysOnTop(true, 'screen-saver');

    this.window.loadURL(SHEET_WINDOW_WEBPACK_ENTRY);

    // if (sprite.name ==='Imoen') {
    //   // Opening devtools causes harmless (?) error: "Request Autofill.enable failed".
    // this.window.webContents.openDevTools({ mode: 'detach' });
    // }

    handlers.window.setForeground();

    ipcMain.on(`sheet.close.${sprite.id}`, (_event: Electron.IpcMainEvent): void => {
      this.teardown();
    });
  }

  public update(): void {
    const params: SheetAPIOnUpdateParams = {
      sprite: spriteSanitize(this.sprite),
      eaTable: eaTable,
      raceTable: raceTable,
    };

    this.window.webContents.send(`sheet.update`, params);
  }

  private position(): Electron.Point {
    const spriteScreen: Electron.Point = this.sprite.screen;

    const sheetScreen: Electron.Point = {
      x: null,
      y: null,
    };

    const sheetSize: Electron.Size = {
      width: this.width,
      height: this.height,
    };

    const sheetPercent: Electron.Size = {
      width: sheetSize.width / handlers.window.window.width,
      height: sheetSize.height / handlers.window.window.height,
    };

    const spritePercent: Electron.Size = {
      width: (spriteScreen.x - handlers.window.windowLeft) / handlers.window.window.width,
      height: (spriteScreen.y - handlers.window.windowTop) / handlers.window.window.height,
    };

    // X
    const marginPercentX = 50 / handlers.window.window.width;

    if (spritePercent.width + sheetPercent.width + marginPercentX > 0.95) {
      sheetScreen.x = spriteScreen.x - sheetSize.width - 50;
    } else {
      sheetScreen.x = spriteScreen.x + 50;
    }

    // Y
    const sheetPercentHalfHeight: number = sheetPercent.height / 2;

    const sheetHalfHeight: number = sheetPercentHalfHeight * handlers.window.window.height;

    const sheetPercentTopOverflow: number = spritePercent.height - sheetPercentHalfHeight - 0.05;

    const sheetPercentBottomOverflow: number = spritePercent.height + sheetPercentHalfHeight - 0.95;

    if (sheetPercentTopOverflow < 0) {
      const sheetTopOverflow: number = Math.round(
        sheetPercentTopOverflow * handlers.window.window.height
      );

      sheetScreen.y = spriteScreen.y - sheetHalfHeight - sheetTopOverflow;
    } else if (sheetPercentBottomOverflow > 0) {
      const sheetBottomOverflow: number = Math.round(
        sheetPercentBottomOverflow * handlers.window.window.height
      );

      sheetScreen.y = spriteScreen.y - sheetHalfHeight - sheetBottomOverflow;
    } else {
      sheetScreen.y = spriteScreen.y - Math.round(sheetSize.height / 2);
    }

    return sheetScreen;
  }

  public teardown(): void {
    ipcMain.removeAllListeners(`sheet.close.${this.sprite.id}`);

    this.window.destroy();

    this.window = null;
  }
}
