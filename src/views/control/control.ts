import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import { handlers } from '../../handlers';
import { linux } from '../../index';

declare const CONTROL_PRELOAD_WEBPACK_ENTRY: string;

declare const CONTROL_WEBPACK_ENTRY: string;

export class Control {
  private width: number = 500;

  private height: number = 500;

  public window: BrowserWindow;

  constructor() {
    this.windowCreate();

    // Opening devtools causes harmless (?) error: "Request Autofill.enable failed".
    // this.window.webContents.openDevTools({ mode: 'detach' });
  }

  private windowCreate(): void {
    this.window = new BrowserWindow({
      x: Math.round(handlers.window.display.width / 2 - this.width / 2),
      y: Math.round(handlers.window.display.height / 2 - this.height / 2),
      icon: linux ? null : path.join(app.getAppPath(), 'src', 'assets', 'icons', '256x256.ico'),
      width: this.width,
      height: this.height,
      minWidth: this.width,
      minHeight: this.height,
      webPreferences: {
        preload: CONTROL_PRELOAD_WEBPACK_ENTRY,
      },
      frame: true,
      autoHideMenuBar: true,
      show: true,
      minimizable: false,
      maximizable: false,
      hasShadow: false,
      transparent: false,
      resizable: false,
    });

    this.window.removeMenu();

    this.window.loadURL(CONTROL_WEBPACK_ENTRY).then((): void => {
      this.window.webContents.send('control.config', { configObj: handlers.config.obj });
    });

    this.window.once('closed', (): void => {
      app.quit();
    });

    ipcMain.once('control.configSet', (event: IpcMainEvent, height: number): void => {
      this.window.setBounds({ height: height + 70 });
    });
  }

  public run(): void {
    this.window?.webContents.send('control.update', { alive: handlers.memscan.alive });
  }
}
