import koffi, { IKoffiCType, IKoffiLib, IKoffiRegisteredCallback, KoffiFunction } from 'koffi';
import { STDCALL } from '../../../const/const-win32';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '../../primitives';
import { StructsWin32 } from '../structs-win32';
import { EnumWindowsCallbackFn } from '../types-win32';

export class SyscallsUser32 {
  constructor(private structsWin32: StructsWin32) {
    // Empty
  }

  private user32: IKoffiLib = koffi.load('user32.dll');

  private EnumWindowsCallbackProto: IKoffiCType = koffi.proto(
    STDCALL,
    'enumWindowsCallback',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, KoffiPrimitives.LONG]
  );

  public EnumWindowsCallbackRegister(callback: EnumWindowsCallbackFn): IKoffiRegisteredCallback {
    return koffi.register(callback, koffi.pointer(this.EnumWindowsCallbackProto));
  }

  public EnumWindows: KoffiFunction = this.user32.func(STDCALL, 'EnumWindows', 'bool', [
    koffi.pointer(this.EnumWindowsCallbackProto),
    KoffiPrimitives.LONG,
  ]);

  public GetForegroundWindow: KoffiFunction = this.user32.func(
    STDCALL,
    'GetForegroundWindow',
    KoffiPrimitivePtrs.VOID,
    []
  );

  public SetForegroundWindow: KoffiFunction = this.user32.func(
    STDCALL,
    'SetForegroundWindow',
    KoffiPrimitivePtrs.VOID,
    [KoffiPrimitivePtrs.VOID]
  );

  public SetWindowLongA: KoffiFunction = this.user32.func(
    STDCALL,
    'SetWindowLongA',
    KoffiPrimitives.LONG,
    [KoffiPrimitivePtrs.VOID, KoffiPrimitives.INT32, KoffiPrimitives.LONG]
  );

  public ShowWindow: KoffiFunction = this.user32.func(STDCALL, 'ShowWindow', KoffiPrimitives.BOOL, [
    KoffiPrimitivePtrs.VOID,
    KoffiPrimitives.INT32,
  ]);

  public SetWindowPos: KoffiFunction = this.user32.func(
    STDCALL,
    'SetWindowPos',
    KoffiPrimitives.BOOL,
    [
      KoffiPrimitivePtrs.VOID,
      KoffiPrimitivePtrs.VOID,
      KoffiPrimitives.INT32,
      KoffiPrimitives.INT32,
      KoffiPrimitives.INT32,
      KoffiPrimitives.INT32,
      KoffiPrimitives.UINT32,
    ]
  );

  public GetCursorPos: KoffiFunction = this.user32.func(
    STDCALL,
    'GetCursorPos',
    KoffiPrimitives.BOOL,
    [koffi.out(this.structsWin32.POINT_PTR)]
  );

  public GetWindowThreadProcessId: KoffiFunction = this.user32.func(
    STDCALL,
    'GetWindowThreadProcessId',
    KoffiPrimitives.LONG,
    [KoffiPrimitivePtrs.VOID, koffi.out(KoffiPrimitivePtrs.LONG)]
  );
}
