import koffi from 'koffi';
import { VOIDPTR } from '../primitives';
import { SyscallsUser32 } from './libs/syscalls-user32';
import { StructsWin32 } from './structs-win32';
import { MODULEENTRY32_TYPE, PROCESSENTRY32_TYPE } from './types-win32';

export class HelpersWin32 {
  constructor(private syscallsUser32: SyscallsUser32, private structsWin32: StructsWin32) {
    // Empty
  }

  public getWindowThreadProcessId(handle: VOIDPTR): number {
    const windowId: number[] = [0];

    this.syscallsUser32.GetWindowThreadProcessId(handle, windowId);

    return windowId[0];
  }

  public PROCESSENTRY32Empty = (): PROCESSENTRY32_TYPE => {
    return {
      dwSize: koffi.sizeof(this.structsWin32.PROCESSENTRY32),
      cntUsage: 0,
      th32ProcessID: 0,
      th32DefaultHeapID: 0,
      th32ModuleID: 0,
      cntThreads: 0,
      th32ParentProcessID: 0,
      pcPriClassBase: 0,
      dwFlags: 0,
      szExeFile: new Array(260).fill(0),
    };
  };

  public MODULEENTRY32Empty(): MODULEENTRY32_TYPE {
    return {
      dwSize: koffi.sizeof(this.structsWin32.MODULEENTRY32),
      th32ModuleID: 0,
      th32ProcessID: 0,
      GlblcntUsage: 0,
      ProccntUsage: 0,
      modBaseAddr: 0,
      modBaseSize: 0,
      hModule: 0,
      szModule: new Array(255 + 1).fill(0),
      szExePath: new Array(260).fill(0),
    };
  }
}
