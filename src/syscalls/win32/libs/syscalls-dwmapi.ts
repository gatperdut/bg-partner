import koffi, { IKoffiLib } from 'koffi';
import { STDCALL } from '../../../const/const-win32';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '../../../koffi/primitives';
import { StructsWin32 } from '../structs-win32';

export class SyscallsDwmapi {
  constructor(private structsWin32: StructsWin32) {
    // Empty
  }

  public dwmapi: IKoffiLib = koffi.load('dwmapi.dll');

  public DwmGetWindowAttribute: koffi.KoffiFunction = this.dwmapi.func(
    STDCALL,
    'DwmGetWindowAttribute',
    KoffiPrimitives.LONG,
    [
      KoffiPrimitivePtrs.VOID,
      KoffiPrimitives.LONG,
      koffi.out(this.structsWin32.RECT_PTR),
      KoffiPrimitives.LONG,
    ]
  );
}
