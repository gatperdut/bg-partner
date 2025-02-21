import koffi from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { handlers } from '../main';
import { EnumWindowsCallbackFn, SyscallsWin32 } from '../syscalls/syscalls-win32';
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

    this.callback = this.syscalls.EnumWindowsCallbackRegister(this.enumWindowsCallback);

    this.syscalls.EnumWindows(this.callback, handlers.memscan.pid);
  }

  private enumWindowsCallback: EnumWindowsCallbackFn = (
    windowHandle: HANDLE_PTR_TYPE,
    somewindowId: number
  ): boolean => {
    this.id = this.syscalls.getWindowThreadProcessId(windowHandle);

    if (this.id === somewindowId) {
      this.handle = windowHandle;

      return false;
    }

    return true;
  };

  public run(): void {
    super.run();

    this.syscalls.DwmGetWindowAttribute(
      this.handle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      this.windowRect,
      koffi.sizeof(this.syscalls.RECT)
    );
  }

  public get focused(): boolean {
    const foreground: HANDLE_PTR_TYPE = this.syscalls.GetForegroundWindow();

    const foregroundPid = this.syscalls.getWindowThreadProcessId(foreground);

    return this.id === foregroundPid;
  }

  public setForeground(): void {
    this.syscalls.SetForegroundWindow(this.handle);
  }

  public teardown(): void {
    if (this.handle) {
      this.syscalls.CloseHandle(this.handle);

      this.handle = null;
    }
  }
}
