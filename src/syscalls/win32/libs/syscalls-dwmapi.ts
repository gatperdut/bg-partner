import koffi, { IKoffiLib } from 'koffi';
import { STDCALL } from '../../../const/const-win32';
import { VOID_PTR } from '../../../koffi/handles';
import { LONG } from '../../../koffi/primitives';
import { StructsWin32 } from '../structs-win32';

export class SyscallsDwmapi {
  constructor(private structsWin32: StructsWin32) {
    // Empty
  }

  public dwmapi: IKoffiLib = koffi.load('dwmapi.dll');

  public DwmGetWindowAttribute: koffi.KoffiFunction = this.dwmapi.func(
    STDCALL,
    'DwmGetWindowAttribute',
    LONG,
    [VOID_PTR, LONG, koffi.out(this.structsWin32.RECT_PTR), LONG]
  );
}
