import { BrowserWindow } from 'electron';
import { Sprite } from '../sprite/sprite';

export const windowInstantiate = (
  preloadEntry: string,
  htmlEntry: string,
  width: number,
  height: number,
  transparent: boolean,
  sprite: Sprite,
  name: string
): BrowserWindow => {
  const window: BrowserWindow = new BrowserWindow({
    webPreferences: {
      preload: preloadEntry,
    },
    frame: false,
    show: false,
    maximizable: false,
    focusable: false,
    skipTaskbar: true,
    hasShadow: false,
    transparent: transparent,
    resizable: false,
  });

  window.setContentSize(width, height);

  window.setSize(width, height);

  window.setMinimumSize(width, height);

  window.setShape([{ x: 0, y: 0, width: height, height: height }]);

  window.setAlwaysOnTop(true, 'screen-saver');

  window.loadURL(htmlEntry);

  if (name && sprite.name.includes(name)) {
    // Openin devtools causes harmless (?) error: "Request Autofill.enable failed".
    window.webContents.openDevTools({ mode: 'detach' });
  }

  return window;
};
