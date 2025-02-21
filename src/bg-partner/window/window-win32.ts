import koffi from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { handlers } from '../main';
import { EnumWindowsCallbackFn } from '../syscalls/win32/libs/syscalls-user32';
import { SyscallsWin32 } from '../syscalls/win32/syscalls-win32';
import { WindowCommon } from './window-common';

export type Screen = {
  width: number;
  height: number;
};

export class WindowWin32 extends WindowCommon {
  private callback: unknown;

  private get syscalls(): SyscallsWin32 {
    return handlers.syscalls as SyscallsWin32;
  }

  public init(): void {
    if (this.handle) {
      return;
    }

    this.callback = this.syscalls.syscallsUser32.EnumWindowsCallbackRegister(
      this.enumWindowsCallback
    );

    this.syscalls.syscallsUser32.EnumWindows(this.callback, handlers.memscan.pid);
  }

  private enumWindowsCallback: EnumWindowsCallbackFn = (
    windowHandle: HANDLE_PTR_TYPE,
    somewindowId: number
  ): boolean => {
    this.id = this.syscalls.syscallsUser32.getWindowThreadProcessId(windowHandle);

    if (this.id === somewindowId) {
      this.handle = windowHandle;

      return false;
    }

    return true;
  };

  public run(): void {
    super.run();

    this.syscalls.syscallsDwmapi.DwmGetWindowAttribute(
      this.handle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      this.windowRect,
      koffi.sizeof(this.syscalls.syscallsDwmapi.RECT)
    );
  }

  public get focused(): boolean {
    const foreground: HANDLE_PTR_TYPE = this.syscalls.syscallsUser32.GetForegroundWindow();

    const foregroundPid = this.syscalls.syscallsUser32.getWindowThreadProcessId(foreground);

    return this.id === foregroundPid;
  }

  public setForeground(): void {
    this.syscalls.syscallsUser32.SetForegroundWindow(this.handle);
  }

  public teardown(): void {
    if (this.handle) {
      this.syscalls.syscallsKernel32.CloseHandle(this.handle);

      this.handle = null;
    }
  }
}
