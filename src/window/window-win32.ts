import koffi, { IKoffiRegisteredCallback } from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../const/const-win32';
import { handlers, syscallsWin32 } from '../handlers';
import { VOIDPTR } from '../syscalls/primitives';
import { EnumWindowsCallbackFn, RECT } from '../syscalls/win32/types-win32';
import { WindowOs } from './window';

export class WindowWin32 extends WindowOs {
  public handle: VOIDPTR;

  private callback: IKoffiRegisteredCallback;

  public init(): void {
    if (this.handle) {
      return;
    }

    this.callback = syscallsWin32().syscallsUser32.EnumWindowsCallbackRegister(
      this.enumWindowsCallback
    );

    syscallsWin32().syscallsUser32.EnumWindows(this.callback, handlers.memscan.pid);
  }

  private enumWindowsCallback: EnumWindowsCallbackFn = (
    handle: VOIDPTR,
    somewindowId: number
  ): boolean => {
    this.id = syscallsWin32().helpersWin32.getWindowThreadProcessId(handle);

    if (this.id === somewindowId) {
      this.handle = handle;

      return false;
    }

    return true;
  };

  public run(): void {
    super.run();

    const rect: RECT = syscallsWin32().helpersWin32.RECTEmpty();

    syscallsWin32().syscallsDwmapi.DwmGetWindowAttribute(
      this.handle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      rect,
      koffi.sizeof(syscallsWin32().structsWin32.RECT)
    );

    this.rect = rect;
  }

  public get focused(): boolean {
    const foreground: VOIDPTR = syscallsWin32().syscallsUser32.GetForegroundWindow();

    const foregroundPid: number = syscallsWin32().helpersWin32.getWindowThreadProcessId(foreground);

    return this.id === foregroundPid;
  }

  public setForeground(): void {
    syscallsWin32().syscallsUser32.SetForegroundWindow(this.handle);
  }

  public teardown(): void {
    if (this.handle) {
      syscallsWin32().syscallsKernel32.CloseHandle(this.handle);

      this.handle = null;
    }
  }
}
