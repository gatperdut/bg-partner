import koffi from 'koffi';
import { DWMWA_EXTENDED_FRAME_BOUNDS, SM_CXSCREEN, SM_CYSCREEN } from './koffi/defs/constants';
import { HANDLE_PTR_TYPE } from './koffi/defs/handles';
import { CloseHandle } from './koffi/defs/methods/process';
import { GetSystemMetrics } from './koffi/defs/methods/system';
import {
  DwmGetWindowAttribute,
  EnumWindows,
  GetForegroundWindow,
} from './koffi/defs/methods/windows';
import { RECT, RECT_empty, RECT_TYPE } from './koffi/defs/structs/rect';
import { EnumWindowsCallbackRegister, getWindowThreadProcessId } from './koffi/windows';

export type Screen = {
  width: number;
  height: number;
};

export class WindowHandler {
  public windowHandle: HANDLE_PTR_TYPE;

  private windowPid: number;

  private callback: unknown;

  public rect: RECT_TYPE;

  public screen: Screen;

  constructor() {
    // Empty
  }

  public init(pid: number): void {
    if (this.windowHandle) {
      return;
    }

    this.callback = EnumWindowsCallbackRegister(this.enumWindowsCallback);

    EnumWindows(this.callback, pid);

    this.rect = RECT_empty();

    this.screen = {
      width: null,
      height: null,
    };
  }

  private enumWindowsCallback = (windowHandle: HANDLE_PTR_TYPE, someWindowPid: number) => {
    this.windowPid = getWindowThreadProcessId(windowHandle);

    if (this.windowPid === someWindowPid) {
      this.windowHandle = windowHandle;

      return false;
    }

    return true;
  };

  public run(): void {
    DwmGetWindowAttribute(
      this.windowHandle,
      DWMWA_EXTENDED_FRAME_BOUNDS,
      this.rect,
      koffi.sizeof(RECT)
    );

    this.screen.width = GetSystemMetrics(SM_CXSCREEN);

    this.screen.height = GetSystemMetrics(SM_CYSCREEN);
  }

  public get focused(): boolean {
    const foreground: HANDLE_PTR_TYPE = GetForegroundWindow();

    const foregroundPid = getWindowThreadProcessId(foreground);

    return this.windowPid === foregroundPid;
  }

  public teardown(): void {
    if (this.windowHandle) {
      CloseHandle(this.windowHandle);

      this.windowHandle = null;
    }
  }
}
