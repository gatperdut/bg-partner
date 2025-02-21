import koffi, { IKoffiCType } from 'koffi';
import { VOID_PTR } from '../../koffi/handles';
import { BYTE, CHAR, LONG, UINT32, ULONG } from '../../koffi/primitives';

export class StructsWin32 {
  public RECT = koffi.struct('RECT', {
    left: UINT32,
    top: UINT32,
    right: UINT32,
    bottom: UINT32,
  });

  public RECT_PTR: IKoffiCType = koffi.pointer(this.RECT);

  public MODULEENTRY32 = koffi.struct('MODULEENTRY32', {
    dwSize: UINT32,
    th32ModuleID: UINT32,
    th32ProcessID: UINT32,
    GlblcntUsage: UINT32,
    ProccntUsage: UINT32,
    modBaseAddr: koffi.pointer(BYTE),
    modBaseSize: UINT32,
    hModule: VOID_PTR,
    szModule: koffi.array(CHAR, 255 + 1, 'Array'),
    szExePath: koffi.array(CHAR, 260, 'Array'),
  });

  public MODULEENTRY32_PTR = koffi.pointer(this.MODULEENTRY32);

  public PROCESSENTRY32 = koffi.struct('PROCESSENTRY32', {
    dwSize: UINT32,
    cntUsage: UINT32,
    th32ProcessID: UINT32,
    th32DefaultHeapID: koffi.pointer(ULONG),
    th32ModuleID: UINT32,
    cntThreads: UINT32,
    th32ParentProcessID: UINT32,
    pcPriClassBase: LONG,
    dwFlags: UINT32,
    szExeFile: koffi.array(CHAR, 260, 'Array'),
  });

  public PROCESSENTRY32_PTR = koffi.pointer(this.PROCESSENTRY32);

  public POINT = koffi.struct('POINT', {
    x: LONG,
    y: LONG,
  });

  public POINT_PTR = koffi.pointer(this.POINT);
}
