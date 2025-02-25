import { BrowserWindow, ipcMain } from 'electron';
import { handlers } from '../../handlers';
import { Sprite } from '../../sprite/sprite';
import { eaTable } from '../../tables/ea';
import { raceTable } from '../../tables/race';
import { SheetAPIUpdateParams } from './renderer';
import { spriteView } from './sprite-view';

declare const SHEET_PRELOAD_WEBPACK_ENTRY: string;

declare const SHEET_WEBPACK_ENTRY: string;

export class Sheet {
  private width: number = 400;

  private height: number = 700;

  public window: BrowserWindow;

  constructor(private sprite: Sprite) {
    this.windowCreate();

    // Opening devtools causes harmless (?) error: "Request Autofill.enable failed".
    // this.window.webContents.openDevTools({ mode: 'detach' });

    handlers.window.setForeground();

    this.setListeners();
  }

  private windowCreate(): void {
    const position: Electron.Point = this.position();

    this.window = new BrowserWindow({
      x: position.x,
      y: position.y,
      width: this.width,
      height: this.height,
      minWidth: this.width,
      minHeight: this.height,
      webPreferences: {
        preload: SHEET_PRELOAD_WEBPACK_ENTRY,
      },
      frame: false,
      show: true,
      minimizable: false,
      maximizable: false,
      focusable: false,
      skipTaskbar: true,
      hasShadow: false,
      transparent: false,
      resizable: false,
    });

    this.window.setAlwaysOnTop(true, 'screen-saver');

    this.window.loadURL(SHEET_WEBPACK_ENTRY);
  }

  private setListeners(): void {
    ipcMain.on(`sheet.close.${this.sprite.basic.id}`, (): void => {
      this.teardown();
    });

    ipcMain.on(
      `sheet.move.${this.sprite.basic.id}`,
      (_event: Electron.IpcMainEvent, movement: Electron.Point): void => {
        this.window.setPosition(
          this.window.getPosition()[0] + movement.x,
          this.window.getPosition()[1] + movement.y
        );
      }
    );
  }

  public update(): void {
    const params: SheetAPIUpdateParams = {
      spriteView: spriteView(this.sprite),
      eaTable: eaTable,
      raceTable: raceTable,
    };

    this.window.webContents.send('sheet.update', params);
  }

  private position(): Electron.Point {
    const spriteScreen: Electron.Point = this.sprite.screen();

    const sheetScreen: Electron.Point = {
      x: null,
      y: null,
    };

    const sheetSize: Electron.Size = {
      width: this.width,
      height: this.height,
    };

    const sheetPercent: Electron.Size = {
      width: sheetSize.width / handlers.window.display.width,
      height: sheetSize.height / handlers.window.display.height,
    };

    const spritePercent: Electron.Size = {
      width: (spriteScreen.x - handlers.window.display.x) / handlers.window.display.width,
      height: (spriteScreen.y - handlers.window.display.y) / handlers.window.display.height,
    };

    // X
    const marginPercentX = 50 / handlers.window.display.width;

    if (spritePercent.width + sheetPercent.width + marginPercentX > 0.95) {
      sheetScreen.x = spriteScreen.x - sheetSize.width - 50;
    } else {
      sheetScreen.x = spriteScreen.x + 50;
    }

    // Y
    const sheetPercentHalfHeight: number = sheetPercent.height / 2;

    const sheetHalfHeight: number = sheetPercentHalfHeight * handlers.window.display.height;

    const sheetPercentTopOverflow: number = spritePercent.height - sheetPercentHalfHeight - 0.05;

    const sheetPercentBottomOverflow: number = spritePercent.height + sheetPercentHalfHeight - 0.95;

    if (sheetPercentTopOverflow < 0) {
      const sheetTopOverflow: number = Math.round(
        sheetPercentTopOverflow * handlers.window.display.height
      );

      sheetScreen.y = spriteScreen.y - sheetHalfHeight - sheetTopOverflow;
    } else if (sheetPercentBottomOverflow > 0) {
      const sheetBottomOverflow: number = Math.round(
        sheetPercentBottomOverflow * handlers.window.display.height
      );

      sheetScreen.y = spriteScreen.y - sheetHalfHeight - sheetBottomOverflow;
    } else {
      sheetScreen.y = spriteScreen.y - Math.round(sheetSize.height / 2);
    }

    return sheetScreen;
  }

  public teardown(): void {
    ipcMain.removeAllListeners(`sheet.close.${this.sprite.basic.id}`);

    ipcMain.removeAllListeners(`sheet.move.${this.sprite.basic.id}`);

    this.window?.destroy();

    this.window = null;
  }
}
