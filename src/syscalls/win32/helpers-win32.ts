import { handlers } from '@handlers';
import { MemscanWin32 } from '@memscan/memscan-win32';
import { Primitive, PrimitiveSizesWin32, Value, VOIDPTR } from '@syscalls/primitives';
import { Kernel32 } from '@syscalls/win32/libs/kernel32';
import { User32 } from '@syscalls/win32/libs/user32';
import { StructsWin32 } from '@syscalls/win32/structs-win32';
import { MODULEENTRY32, POINT, PROCESSENTRY32, RECT } from '@syscalls/win32/types-win32';
import * as koffi from 'koffi';

export class HelpersWin32 {
  constructor(
    private syscallsUser32: User32,
    private syscallsKernel32: Kernel32,
    private structsWin32: StructsWin32
  ) {
    // Empty
  }

  public getWindowThreadProcessId(handle: VOIDPTR): number {
    const windowId: number[] = [0];

    this.syscallsUser32.GetWindowThreadProcessId(handle, windowId);

    return windowId[0];
  }

  public PROCESSENTRY32Empty = (): PROCESSENTRY32 => {
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

  public MODULEENTRY32Empty(): MODULEENTRY32 {
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

  public RECTEmpty(): RECT {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
  }

  public POINTEmpty(): POINT {
    return {
      x: 0,
      y: 0,
    };
  }

  public memReadNumber(ptr: bigint, primitive: Primitive): Value {
    const bytesRead: number[] = [null];

    const value: number[] = [null];

    this.syscallsKernel32.ReadProcessMemoryNumber[primitive](
      (handlers.memscan as MemscanWin32).targetProcess as VOIDPTR,
      ptr as unknown as VOIDPTR,
      value,
      PrimitiveSizesWin32[primitive],
      bytesRead
    );

    return primitive === 'ADDR' ? BigInt(value[0]) : value[0];
  }
}
