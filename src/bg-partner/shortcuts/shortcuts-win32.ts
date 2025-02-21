import { globalShortcut } from 'electron';
import {
  GWL_STYLE,
  HWND_TOP,
  SW_SHOW,
  SWP_ASYNCWINDOWPOS,
  WS_MAXIMIZE,
} from '../koffi/defs/constants';

import { handlers } from '../main';
import { SyscallsWin32 } from '../syscalls/syscalls-win32';

export class ShortcutsWin32 {
  constructor() {
    globalShortcut.register('CommandOrControl+A', (): void => {
      handlers.window.focused && this.sheetToggle();
    });

    globalShortcut.register('CommandOrControl+Q', (): void => {
      handlers.window.focused && this.borderless();
    });
  }

  private get syscalls(): SyscallsWin32 {
    return handlers.syscalls as SyscallsWin32;
  }

  private sheetToggle(): void {
    const point: Electron.Point = {
      x: 0,
      y: 0,
    };

    this.syscalls.GetCursorPos(point);

    handlers.entities.sheetToggle(point);
  }

  private borderless(): void {
    this.syscalls.SetWindowLongA(handlers.window.handle, GWL_STYLE, WS_MAXIMIZE);

    this.syscalls.ShowWindow(handlers.window.handle, SW_SHOW);

    this.syscalls.SetWindowPos(
      handlers.window.handle,
      HWND_TOP,
      0,
      0,
      handlers.window.screen.width,
      handlers.window.screen.height,
      SWP_ASYNCWINDOWPOS
    );
  }
}
