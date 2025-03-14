import { ShortcutsOS } from '@shortcuts/shortcuts';
import { POINT } from '@syscalls/win32/types-win32';
import { WindowWin32 } from '@window/window-win32';

import { GWL_STYLE, HWND_TOP, SW_SHOW, SWP_ASYNCWINDOWPOS, WS_MAXIMIZE } from '@const/const-win32';
import { handlers, syscallsWin32 } from '@handlers';

export class ShortcutsWin32 extends ShortcutsOS {
  constructor() {
    super();
  }

  protected sheetToggle(): void {
    const point: POINT = syscallsWin32().helpers.POINTEmpty();

    syscallsWin32().user32.GetCursorPos(point);

    handlers.entities.sheetToggle(point);
  }

  protected borderless(): void {
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
