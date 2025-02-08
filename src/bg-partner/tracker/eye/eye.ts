import { BrowserWindow, ipcMain } from 'electron';
import { SetForegroundWindow } from '../../koffi/defs/methods/windows';
import { Sprite } from '../../sprite';
import { WindowHandler } from '../../window.handler';

declare const EYE_WINDOW_WEBPACK_ENTRY: string;

declare const EYE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export class Eye {
  public window: BrowserWindow;

  constructor(private windowHandler: WindowHandler, private sprite: Sprite) {
    this.instantiate();

    this.window.webContents.once('dom-ready', (): void => {
      this.window.webContents.send('initialize', { id: this.sprite.id, name: this.sprite.name });
    });

    ipcMain.on('eye-click', (_event: Electron.IpcMainEvent, id: number): void => {
      if (this.sprite.id !== id) {
        return;
      }

      SetForegroundWindow(this.windowHandler.windowHandle);

      console.log(JSON.stringify(this.sprite));
    });
  }

  private instantiate() {
    this.window = new BrowserWindow({
      webPreferences: {
        preload: EYE_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      frame: false,
      show: false,
      skipTaskbar: true,
      hasShadow: false,
      transparent: true,
      resizable: false,
    });

    this.window.setContentSize(23, 20);

    this.window.setSize(23, 20);

    this.window.setMinimumSize(23, 20);

    this.window.setShape([{ x: 0, y: 0, width: 20, height: 20 }]);

    this.window.setAlwaysOnTop(true, 'screen-saver');

    this.window.loadURL(EYE_WINDOW_WEBPACK_ENTRY);

    if (this.sprite.name.includes('moe')) {
      // Openin devtools causes harmless (?) error: "Request Autofill.enable failed".
      this.window.webContents.openDevTools({ mode: 'detach' });
    }
  }
}
