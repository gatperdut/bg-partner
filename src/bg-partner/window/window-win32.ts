import koffi from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { Wincalls } from '../wincalls';
import { WindowCommon } from './window-common';

export type Screen = {
  width: number;
  height: number;
};

export class WindowWin32 extends WindowCommon {
  public windowHandle: HANDLE_PTR_TYPE;

  private windowPid: number;

  private callback: unknown;

  constructor(private wincalls: Wincalls) {
    super();
  }

  public init(pid: number): void {
    if (this.windowHandle) {
      return;
    }

    this.callback = this.wincalls.EnumWindowsCallbackRegister(this.enumWindowsCallback);

    this.wincalls.EnumWindows(this.callback, pid);
  }

  private enumWindowsCallback = (windowHandle: HANDLE_PTR_TYPE, someWindowPid: number) => {
    this.windowPid = this.wincalls.getWindowThreadProcessId(windowHandle);

    if (this.windowPid === someWindowPid) {
      this.windowHandle = windowHandle;

      return false;
    }

    return true;
  };

  public run(pid: number): void {
    super.run(pid);

    this.wincalls.DwmGetWindowAttribute(
      this.windowHandle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      this.windowRect,
      koffi.sizeof(this.wincalls.RECT)
    );
  }

  public get focused(): boolean {
    const foreground: HANDLE_PTR_TYPE = this.wincalls.GetForegroundWindow();

    const foregroundPid = this.wincalls.getWindowThreadProcessId(foreground);

    return this.windowPid === foregroundPid;
  }

  public setForeground(): void {
    this.wincalls.SetForegroundWindow(this.windowHandle);
  }

  public teardown(): void {
    if (this.windowHandle) {
      this.wincalls.CloseHandle(this.windowHandle);

      this.windowHandle = null;
    }
  }
}
