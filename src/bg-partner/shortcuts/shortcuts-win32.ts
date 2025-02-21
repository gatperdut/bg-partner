import { globalShortcut } from 'electron';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  WS_MAXIMIZE,
} from '../koffi/defs/constants';

import { handlers } from '../main';

export class ShortcutsWin32 {
  constructor() {
    globalShortcut.register('CommandOrControl+A', (): void => {
      handlers.window.focused && this.sheetToggle();
    });

    globalShortcut.register('CommandOrControl+Q', (): void => {
      handlers.window.focused && this.borderless();
    });
  }

  private sheetToggle(): void {
    const point: Electron.Point = {
      x: 0,
      y: 0,
    };

    handlers.wincalls.GetCursorPos(point);

    handlers.entities.sheetToggle(point);
  }

  private borderless(): void {
    handlers.wincalls.SetWindowLongA(handlers.window.windowHandle, GWL_STYLE, WS_MAXIMIZE);

    handlers.wincalls.ShowWindow(handlers.window.windowHandle, SW_SHOW);

    handlers.wincalls.SetWindowPos(
      handlers.window.windowHandle,
      HWND_TOP,
      0,
      0,
      handlers.window.screenSize.width,
      handlers.window.screenSize.height,
      SWP_ASYNCWINDOWPOS
    );
  }
}
