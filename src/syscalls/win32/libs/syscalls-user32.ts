import koffi from 'koffi';
import { STDCALL } from '../../../const/const-win32';
import { VOID_PTR, VOID_PTR_TYPE } from '../../../koffi/handles';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '../../../koffi/primitives';
import { StructsWin32 } from '../structs-win32';
import { EnumWindowsCallbackFn } from '../types-win32';

export class SyscallsUser32 {
  constructor(private structsWin32: StructsWin32) {
    // Empty
  }

  private user32 = koffi.load('user32.dll');

  private EnumWindowsCallbackProto = koffi.proto(
    'bool __stdcall enumWindowsCallback(_In_ void* hwnd, _In_ long lParam)'
  );

  public EnumWindowsCallbackRegister = (callback: EnumWindowsCallbackFn) => {
    return koffi.register(callback, koffi.pointer(this.EnumWindowsCallbackProto));
  };

  public EnumWindows = this.user32.func(STDCALL, 'EnumWindows', 'bool', [
    koffi.pointer(this.EnumWindowsCallbackProto),
    KoffiPrimitives.LONG,
  ]);

  public GetForegroundWindow = this.user32.func(STDCALL, 'GetForegroundWindow', VOID_PTR, []);

  public SetForegroundWindow = this.user32.func(STDCALL, 'SetForegroundWindow', VOID_PTR, [
    VOID_PTR,
  ]);

  public SetWindowLongA = this.user32.func(STDCALL, 'SetWindowLongA', KoffiPrimitives.LONG, [
    VOID_PTR,
    KoffiPrimitives.INT32,
    KoffiPrimitives.LONG,
  ]);

  public ShowWindow = this.user32.func(STDCALL, 'ShowWindow', KoffiPrimitives.BOOL, [
    VOID_PTR,
    KoffiPrimitives.INT32,
  ]);

  public SetWindowPos = this.user32.func(STDCALL, 'SetWindowPos', KoffiPrimitives.BOOL, [
    VOID_PTR,
    VOID_PTR,
    KoffiPrimitives.INT32,
    KoffiPrimitives.INT32,
    KoffiPrimitives.INT32,
    KoffiPrimitives.INT32,
    KoffiPrimitives.UINT32,
  ]);

  public GetCursorPos = this.user32.func(STDCALL, 'GetCursorPos', KoffiPrimitives.BOOL, [
    koffi.out(this.structsWin32.POINT_PTR),
  ]);

  private GetWindowThreadProcessId = this.user32.func(
    STDCALL,
    'GetWindowThreadProcessId',
    KoffiPrimitives.LONG,
    [VOID_PTR, koffi.out(KoffiPrimitivePtrs.LONG)]
  );

  public getWindowThreadProcessId = (windowHandle: VOID_PTR_TYPE): number => {
    const windowId: number[] = [0];

    this.GetWindowThreadProcessId(windowHandle, windowId);

    return windowId[0];
  };
}
