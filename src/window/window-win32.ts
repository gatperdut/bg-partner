import koffi, { IKoffiRegisteredCallback } from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../const/const-win32';
import { handlers } from '../main';
import { VOIDPTR } from '../syscalls/primitives';
import { SyscallsWin32 } from '../syscalls/win32/syscalls-win32';
import { EnumWindowsCallbackFn } from '../syscalls/win32/types-win32';
import { WindowOs } from './window';

export type Screen = {
  width: number;
  height: number;
};

export class WindowWin32 extends WindowOs {
  public handle: VOIDPTR;

  private callback: IKoffiRegisteredCallback;

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
    handle: VOIDPTR,
    somewindowId: number
  ): boolean => {
    this.id = this.syscalls.helpersWin32.getWindowThreadProcessId(handle);

    if (this.id === somewindowId) {
      this.handle = handle;

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
      koffi.sizeof(this.syscalls.structsWin32.RECT)
    );
  }

  public get focused(): boolean {
    const foreground: VOIDPTR = this.syscalls.syscallsUser32.GetForegroundWindow();

    const foregroundPid = this.syscalls.helpersWin32.getWindowThreadProcessId(foreground);

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
