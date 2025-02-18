import koffi from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS } from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { CloseHandle } from '../koffi/defs/methods/process';
import {
  DwmGetWindowAttribute,
  EnumWindows,
  GetForegroundWindow,
  SetForegroundWindow,
} from '../koffi/defs/methods/windows';
import { RECT } from '../koffi/defs/structs/rect';
import { EnumWindowsCallbackRegister, getWindowThreadProcessId } from '../koffi/windows';
import { WindowCommon } from './window-common';

export type Screen = {
  width: number;
  height: number;
};

export class WindowWin32 extends WindowCommon {
  public windowHandle: HANDLE_PTR_TYPE;

  private windowPid: number;

  private callback: unknown;

  constructor() {
    super();
  }

  public init(pid: number): void {
    if (this.windowHandle) {
      return;
    }

    this.callback = EnumWindowsCallbackRegister(this.enumWindowsCallback);

    EnumWindows(this.callback, pid);
  }

  private enumWindowsCallback = (windowHandle: HANDLE_PTR_TYPE, someWindowPid: number) => {
    this.windowPid = getWindowThreadProcessId(windowHandle);

    if (this.windowPid === someWindowPid) {
      this.windowHandle = windowHandle;

      return false;
    }

    return true;
  };

  public run(pid: number): void {
    super.run(pid);

    DwmGetWindowAttribute(
      this.windowHandle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      this.windowRect,
      koffi.sizeof(RECT)
    );
  }

  public get focused(): boolean {
    const foreground: HANDLE_PTR_TYPE = GetForegroundWindow();

    const foregroundPid = getWindowThreadProcessId(foreground);

    return this.windowPid === foregroundPid;
  }

  public setForeground(): void {
    SetForegroundWindow(this.windowHandle);
  }

  public teardown(): void {
    if (this.windowHandle) {
      CloseHandle(this.windowHandle);

      this.windowHandle = null;
    }
  }
}
