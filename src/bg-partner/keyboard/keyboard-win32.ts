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
import { KeyboardCommon } from './keyboard-common';

export class KeyboardWin32 extends KeyboardCommon {
  constructor(
    private windowHandler: WindowWin32,
    protected entitiesHandler: Entities,
    private wincalls: Wincalls
  ) {
    super(entitiesHandler);

    // MIG
    globalShortcut.register('CommandOrControl+A', () => {
      this.windowHandler.focused && this.sheetToggle();
    });
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
