import { globalShortcut } from 'electron';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  WS_MAXIMIZE,
} from '../const/const-win32';

import { config, handlers, syscallsWin32 } from '../handlers';
import { POINT } from '../syscalls/win32/types-win32';
import { WindowWin32 } from '../window/window-win32';
import { ShortcutsOS } from './shortcuts';

export class ShortcutsWin32 extends ShortcutsOS {
  constructor() {
    super();

    globalShortcut.register(config().accelSheet, (): void => {
      handlers.window.focused && this.sheetToggle();
    });

    globalShortcut.register(config().accelBorderless, (): void => {
      handlers.window.focused && this.borderless();
    });
  }

  private sheetToggle(): void {
    const point: POINT = syscallsWin32().helpers.POINTEmpty();

    syscallsWin32().user32.GetCursorPos(point);

    handlers.entities.sheetToggle(point);
  }

  private borderless(): void {
    syscallsWin32().user32.SetWindowLongA(
      (handlers.window as WindowWin32).handle,
      GWL_STYLE,
      WS_MAXIMIZE
    );

    syscallsWin32().user32.ShowWindow((handlers.window as WindowWin32).handle, SW_SHOW);

    syscallsWin32().user32.SetWindowPos(
      (handlers.window as WindowWin32).handle,
      HWND_TOP,
      handlers.window.display.x,
      handlers.window.display.y,
      handlers.window.display.width,
      handlers.window.display.height,
      SWP_ASYNCWINDOWPOS
    );
  }
}
