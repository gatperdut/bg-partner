import { globalShortcut } from 'electron';
import { Entities } from '../entities';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  VK_RMENU,
  WS_MAXIMIZE,
} from '../koffi/defs/constants';

import { Wincalls } from '../wincalls';
import { WindowWin32 } from '../window/window-win32';

export class KeyboardWin32 {
  constructor(
    private windowHandler: WindowWin32,
    private entitiesHandler: Entities,
    private wincalls: Wincalls
  ) {
    globalShortcut.register('CommandOrControl+A', () => {
      this.windowHandler.focused && this.sheetToggle();
    });
  }

  private sheetToggle(): void {
    const point: Electron.Point = {
      x: 0,
      y: 0,
    };

    this.wincalls.GetCursorPos(point);

    this.entitiesHandler.sheetToggle(point);
  }

  public run(): void {
    if (!this.windowHandler.focused) {
      return;
    }

    const rAlt = this.wincalls.GetAsyncKeyState(VK_RMENU);

    if (rAlt) {
      this.wincalls.SetWindowLongA(this.windowHandler.windowHandle, GWL_STYLE, WS_MAXIMIZE);

      this.wincalls.ShowWindow(this.windowHandler.windowHandle, SW_SHOW);

      this.wincalls.SetWindowPos(
        this.windowHandler.windowHandle,
        HWND_TOP,
        0,
        0,
        this.windowHandler.screenSize.width,
        this.windowHandler.screenSize.height,
        SWP_ASYNCWINDOWPOS
      );
    }
  }
}
