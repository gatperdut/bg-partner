import { globalShortcut, screen } from 'electron';
import { EntitiesHandler } from './entities.handler';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  VK_RMENU,
  WS_MAXIMIZE,
} from './koffi/defs/constants';
import { GetAsyncKeyState } from './koffi/defs/methods/keyboard';
import { SetWindowLongA, SetWindowPos, ShowWindow } from './koffi/defs/methods/windows';
import { WindowHandler } from './window.handler';

export class KeyboardHandler {
  constructor(private windowHandler: WindowHandler, private entitiesHandler: EntitiesHandler) {
    globalShortcut.register('CommandOrControl+A', () => {
      this.windowHandler.focused && this.sheetToggle();
    });
  }

  private sheetToggle(): void {
    const point: Electron.Point = screen.dipToScreenPoint(screen.getCursorScreenPoint());

    this.entitiesHandler.sheetToggle(point);
  }

  public run(): void {
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
        this.windowHandler.screen.width,
        this.windowHandler.screen.height,
        SWP_ASYNCWINDOWPOS
      );
    }
  }
}
