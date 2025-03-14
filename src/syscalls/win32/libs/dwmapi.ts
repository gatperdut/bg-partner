import { STDCALL } from '@const/const-win32';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '@syscalls/primitives';
import { StructsWin32 } from '@syscalls/win32/structs-win32';
import koffi, { IKoffiLib } from 'koffi';

export class Dwmapi {
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
      koffi.out(this.structsWin32.RECTPTR),
      KoffiPrimitives.LONG,
    ]
  );
}
