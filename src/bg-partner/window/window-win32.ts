import koffi from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { handlers } from '../main';
import { WindowCommon } from './window-common';

export type Screen = {
  width: number;
  height: number;
};

export class WindowWin32 extends WindowCommon {
  private callback: unknown;

  public init(pid: number): void {
    if (this.windowHandle) {
      return;
    }

    this.callback = handlers.wincalls.EnumWindowsCallbackRegister(this.enumWindowsCallback);

    handlers.wincalls.EnumWindows(this.callback, pid);
  }

  private enumWindowsCallback = (windowHandle: HANDLE_PTR_TYPE, somewindowId: number) => {
    this.windowId = handlers.wincalls.getWindowThreadProcessId(windowHandle);

    if (this.windowId === somewindowId) {
      this.windowHandle = windowHandle;

      return false;
    }

    return true;
  };

  public run(pid: number): void {
    super.run(pid);

    handlers.wincalls.DwmGetWindowAttribute(
      this.windowHandle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      this.windowRect,
      koffi.sizeof(handlers.wincalls.RECT)
    );
  }

  public get focused(): boolean {
    const foreground: HANDLE_PTR_TYPE = handlers.wincalls.GetForegroundWindow();

    const foregroundPid = handlers.wincalls.getWindowThreadProcessId(foreground);

    return this.windowId === foregroundPid;
  }

  public setForeground(): void {
    handlers.wincalls.SetForegroundWindow(this.windowHandle);
  }

  public teardown(): void {
    if (this.windowHandle) {
      handlers.wincalls.CloseHandle(this.windowHandle);

      this.windowHandle = null;
    }
  }
}
