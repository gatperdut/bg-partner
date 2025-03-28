import { DWMWA_EXTENDED_FRAME_BOUNDS } from '@const/const-win32';
import { handlers, syscallsWin32 } from '@handlers';
import { VOIDPTR } from '@syscalls/primitives';
import { EnumWindowsCallbackFn, RECT } from '@syscalls/win32/types-win32';
import { WindowOs } from '@window/window';
import koffi from 'koffi';

export class WindowWin32 extends WindowOs {
  public handle: VOIDPTR;

  private callback: koffi.IKoffiRegisteredCallback;

  public init(): void {
    if (this.handle) {
      return;
    }

    this.callback = syscallsWin32().user32.EnumWindowsCallbackRegister(this.enumWindowsCallback);

    syscallsWin32().user32.EnumWindows(this.callback, handlers.memscan.pid);
  }

  private enumWindowsCallback: EnumWindowsCallbackFn = (
    handle: VOIDPTR,
    somewindowId: number
  ): boolean => {
    this.id = syscallsWin32().helpers.getWindowThreadProcessId(handle);

    if (this.id === somewindowId) {
      this.handle = handle;

      return false;
    }

    return true;
  };

  public run(): void {
    const rect: RECT = syscallsWin32().helpers.RECTEmpty();

    syscallsWin32().dwmapi.DwmGetWindowAttribute(
      this.handle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      rect,
      koffi.sizeof(syscallsWin32().structs.RECT)
    );

    this.window.x = rect.left;

    this.window.y = rect.top;

    this.window.width = rect.right - rect.left;

    this.window.height = rect.bottom - rect.top;

    this.focusedUpdate();
  }

  private get focused(): boolean {
    const foreground: VOIDPTR = syscallsWin32().user32.GetForegroundWindow();

    const foregroundPid: number = syscallsWin32().helpers.getWindowThreadProcessId(foreground);

    return this.id === foregroundPid;
  }

  protected focusedUpdate(): void {
    const focused: boolean = this.focused;

    if (this.focusedLast !== focused) {
      this.focusChanged(focused);
    }

    this.focusedLast = focused;
  }

  public setForeground(): void {
    syscallsWin32().user32.SetForegroundWindow(this.handle);
  }

  public teardown(): void {
    if (this.handle) {
      syscallsWin32().kernel32.CloseHandle(this.handle);

      this.handle = null;
    }
  }
}
