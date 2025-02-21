import koffi from 'koffi';
import { STDCALL } from '../../../const/const-win32';
import { HANDLE_PTR } from '../../../koffi/handles';
import { LONG } from '../../../koffi/primitives';
import { StructsWin32 } from '../structs-win32';

export class SyscallsDwmapi {
  constructor(private structsWin32: StructsWin32) {
    // Empty
  }

  public dwmapi = koffi.load('dwmapi.dll');

  public RECT_PTR = koffi.pointer(this.structsWin32.RECT);

  public DwmGetWindowAttribute = this.dwmapi.func(STDCALL, 'DwmGetWindowAttribute', LONG, [
    HANDLE_PTR,
    LONG,
    koffi.out(this.RECT_PTR),
    LONG,
  ]);
}
