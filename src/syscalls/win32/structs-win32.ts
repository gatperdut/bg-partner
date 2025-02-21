import koffi from 'koffi';
import { HANDLE_PTR } from '../../koffi/handles';
import { BYTE, LONG, UINT32, ULONG } from '../../koffi/primitives';
import { HelpersWin32 } from './helpers-win32';

export class StructsWin32 {
  constructor(private helpersWin32: HelpersWin32) {
    // Empty
  }

  public RECT = koffi.struct('RECT', {
    left: UINT32,
    top: UINT32,
    right: UINT32,
    bottom: UINT32,
  });

  public MODULEENTRY32 = koffi.struct('MODULEENTRY32', {
    dwSize: UINT32,
    th32ModuleID: UINT32,
    th32ProcessID: UINT32,
    GlblcntUsage: UINT32,
    ProccntUsage: UINT32,
    modBaseAddr: koffi.pointer(BYTE),
    modBaseSize: UINT32,
    hModule: HANDLE_PTR,
    szModule: this.helpersWin32.CHAR_ARRAY(255 + 1),
    szExePath: this.helpersWin32.CHAR_ARRAY(260),
  });

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
    szExeFile: this.helpersWin32.CHAR_ARRAY(260),
  });

  public POINT = koffi.struct('POINT', {
    x: LONG,
    y: LONG,
  });
}
