import { STDCALL } from '@const/const-win32';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '@syscalls/primitives';
import { StructsWin32 } from '@syscalls/win32/structs-win32';
import koffi, { IKoffiLib, KoffiFunction } from 'koffi';

export class Dwmapi {
  public dwmapi: IKoffiLib = koffi.load('dwmapi.dll');

  public DwmGetWindowAttribute: KoffiFunction;

  constructor(private structsWin32: StructsWin32) {
    this.DwmGetWindowAttribute_Setup();
  }

  private DwmGetWindowAttribute_Setup(): void {
    this.DwmGetWindowAttribute = this.dwmapi.func(
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
}
