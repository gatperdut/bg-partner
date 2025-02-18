import { globalShortcut } from 'electron';
import { EntitiesHandler } from '../entities.handler';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  VK_RMENU,
  WS_MAXIMIZE,
} from '../koffi/defs/constants';
import { GetAsyncKeyState } from '../koffi/defs/methods/keyboard';
import { SetWindowLongA, SetWindowPos, ShowWindow } from '../koffi/defs/methods/windows';
import { WindowWin32 } from '../window/window-win32';
import { KeyboardCommon } from './keyboard-common';

export class KeyboardWin32 extends KeyboardCommon {
  constructor(private windowHandler: WindowWin32, protected entitiesHandler: EntitiesHandler) {
    super(entitiesHandler);

    // MIG
    globalShortcut.register('CommandOrControl+A', () => {
      this.windowHandler.focused && this.sheetToggle();
    });
  }

  protected run(): void {
    if (!this.windowHandler.focused) {
      return;
    }

    const rAlt = GetAsyncKeyState(VK_RMENU);

    if (rAlt) {
      SetWindowLongA(this.windowHandler.windowHandle, GWL_STYLE, WS_MAXIMIZE);

      ShowWindow(this.windowHandler.windowHandle, SW_SHOW);

      SetWindowPos(
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
