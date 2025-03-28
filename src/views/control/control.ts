import { config, handlers, reqsLinux } from '@handlers';
import { ControlAPISetupParams } from '@views/control/renderer';
import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';

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
      icon: handlers.linux
        ? null
        : path.join(app.getAppPath(), 'src', 'assets', 'icons', '256x256.ico'),
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
      const params: ControlAPISetupParams = {
        linux: handlers.linux,
        reqsObj: reqsLinux().obj,
        configObj: config().obj,
      };

      this.window.webContents.send('control.setup', params);
    });

    this.window.once('closed', (): void => {
      app.quit();
    });

    ipcMain.once('control.configSet', (_event: IpcMainEvent, height: number): void => {
      this.window.setBounds({ height: height + 90 });
    });
  }

  public run(): void {
    !this.window.isDestroyed() &&
      this.window?.webContents.send('control.update', {
        linux: handlers.linux,
        alive: handlers.memscan.alive,
        reqsObj: reqsLinux().obj,
      });
  }
}
