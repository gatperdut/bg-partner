import koffi from 'koffi';
import { STDCALL } from '../../../koffi/constants';
import { HANDLE_PTR } from '../../../koffi/handles';
import { LONG, UINT32 } from '../../../koffi/primitives';

export class SyscallsDwmapi {
  public dwmapi = koffi.load('dwmapi.dll');

  public RECT = koffi.struct('RECT', {
    left: UINT32,
    top: UINT32,
    right: UINT32,
    bottom: UINT32,
  });

  public RECT_PTR = koffi.pointer(this.RECT);

  public DwmGetWindowAttribute = this.dwmapi.func(STDCALL, 'DwmGetWindowAttribute', LONG, [
    HANDLE_PTR,
    LONG,
    koffi.out(this.RECT_PTR),
    LONG,
  ]);
}
