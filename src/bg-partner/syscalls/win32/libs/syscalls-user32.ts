import koffi from 'koffi';
import { STDCALL } from '../../../koffi/constants';
import { HANDLE_PTR, HANDLE_PTR_TYPE } from '../../../koffi/handles';
import { BOOL, INT32, LONG, UINT32 } from '../../../koffi/primitives';

export type EnumWindowsCallbackFn = (
  windowHandle: HANDLE_PTR_TYPE,
  somewindowId: number
) => boolean;

export class SyscallsUser32 {
  private user32 = koffi.load('user32.dll');

  public POINT = koffi.struct('POINT', {
    x: LONG,
    y: LONG,
  });

  public POINT_PTR = koffi.pointer(this.POINT);

  public GetWindowThreadProcessId = this.user32.func(STDCALL, 'GetWindowThreadProcessId', LONG, [
    HANDLE_PTR,
    koffi.out(koffi.pointer(LONG)),
  ]);

  public EnumWindowsCallbackProto = koffi.proto(
    'bool __stdcall enumWindowsCallback(_In_ void* hwnd, _In_ long lParam)'
  );

  public EnumWindowsCallbackRegister = (callback: EnumWindowsCallbackFn) => {
    return koffi.register(callback, koffi.pointer(this.EnumWindowsCallbackProto));
  };

  public EnumWindows = this.user32.func(STDCALL, 'EnumWindows', 'bool', [
    koffi.pointer(this.EnumWindowsCallbackProto),
    LONG,
  ]);

  public GetForegroundWindow = this.user32.func(STDCALL, 'GetForegroundWindow', HANDLE_PTR, []);

  public SetForegroundWindow = this.user32.func(STDCALL, 'SetForegroundWindow', HANDLE_PTR, [
    HANDLE_PTR,
  ]);

  public SetWindowLongA = this.user32.func(STDCALL, 'SetWindowLongA', LONG, [
    HANDLE_PTR,
    INT32,
    LONG,
  ]);

  public ShowWindow = this.user32.func(STDCALL, 'ShowWindow', BOOL, [HANDLE_PTR, INT32]);

  public SetWindowPos = this.user32.func(STDCALL, 'SetWindowPos', BOOL, [
    HANDLE_PTR,
    HANDLE_PTR,
    INT32,
    INT32,
    INT32,
    INT32,
    UINT32,
  ]);

  public GetCursorPos = this.user32.func(STDCALL, 'GetCursorPos', BOOL, [
    koffi.out(this.POINT_PTR),
  ]);

  public getWindowThreadProcessId = (windowHandle: HANDLE_PTR_TYPE): number => {
    const windowId: number[] = [0];

    this.GetWindowThreadProcessId(windowHandle, windowId);

    return windowId[0];
  };
}
