import { globalShortcut } from 'electron';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  WS_MAXIMIZE,
} from '../const/const-win32';

import { handlers, syscallsWin32 } from '../handlers';
import { POINT } from '../syscalls/win32/types-win32';
import { WindowWin32 } from '../window/window-win32';

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
      0,
      0,
      handlers.window.screen.width,
      handlers.window.screen.height,
      SWP_ASYNCWINDOWPOS
    );
  }
}
