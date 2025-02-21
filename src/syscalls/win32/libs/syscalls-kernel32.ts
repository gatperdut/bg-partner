import koffi from 'koffi';
import { STDCALL } from '../../../const/const-win32';
import { VOID_PTR, VOID_PTR_TYPE } from '../../../koffi/handles';
import {
  BOOL,
  BYTE,
  DWORD,
  INT16,
  INT32,
  LONG,
  LONG_PTR,
  NUMBER,
  UINT16,
  UINT32,
  UINT8,
  ULONG,
} from '../../../koffi/primitives';
import { StructsWin32 } from '../structs-win32';

export type PROCESSENTRY32_TYPE = {
  dwSize: number;
  cntUsage: number;
  th32ProcessID: number;
  th32DefaultHeapID: unknown;
  th32ModuleID: number;
  cntThreads: number;
  th32ParentProcessID: number;
  pcPriClassBase: number;
  dwFlags: number;
  szExeFile: number[];
};

export type MODULEENTRY32_TYPE = {
  dwSize: number;
  th32ModuleID: 0;
  th32ProcessID: 0;
  GlblcntUsage: 0;
  ProccntUsage: 0;
  modBaseAddr: 0;
  modBaseSize: 0;
  hModule: 0;
  szModule: number[];
  szExePath: number[];
};

type ReadProcessMemoryFn = (
  handlePtr: VOID_PTR_TYPE,
  address: VOID_PTR_TYPE,
  value: number[],
  size: number,
  bytesRead: number[]
) => number;

export class SyscallsKernel32 {
  constructor(private structsWin32: StructsWin32) {
    // Empty
  }

  private kernel32 = koffi.load('kernel32.dll');

  public MODULEENTRY32_empty(): MODULEENTRY32_TYPE {
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

  private ReadProcessMemoryNumberDefine(type: koffi.IKoffiCType): ReadProcessMemoryFn {
    return this.kernel32.func(STDCALL, 'ReadProcessMemory', BOOL, [
      VOID_PTR,
      VOID_PTR,
      koffi.out(koffi.pointer(type)),
      ULONG,
      koffi.out(koffi.pointer(UINT32)),
    ]);
  }

  public ReadProcessMemoryNumber: Record<NUMBER, ReadProcessMemoryFn> = {
    BOOL: this.ReadProcessMemoryNumberDefine(BYTE),
    BYTE: this.ReadProcessMemoryNumberDefine(BYTE),
    UINT8: this.ReadProcessMemoryNumberDefine(UINT8),
    INT16: this.ReadProcessMemoryNumberDefine(INT16),
    UINT16: this.ReadProcessMemoryNumberDefine(UINT16),
    INT32: this.ReadProcessMemoryNumberDefine(INT32),
    UINT32: this.ReadProcessMemoryNumberDefine(UINT32),
    DWORD: this.ReadProcessMemoryNumberDefine(DWORD),
    LONG: this.ReadProcessMemoryNumberDefine(LONG),
    ULONG: this.ReadProcessMemoryNumberDefine(ULONG),
    PTR: this.ReadProcessMemoryNumberDefine(UINT32),
  };

  public Process32First = this.kernel32.func(STDCALL, 'Process32First', BOOL, [
    VOID_PTR,
    koffi.inout(this.structsWin32.PROCESSENTRY32_PTR),
  ]);

  public Process32Next = this.kernel32.func(STDCALL, 'Process32Next', BOOL, [
    VOID_PTR,
    koffi.inout(this.structsWin32.PROCESSENTRY32_PTR),
  ]);

  public Module32First = this.kernel32.func(STDCALL, 'Module32First', BOOL, [
    VOID_PTR,
    koffi.inout(this.structsWin32.MODULEENTRY32_PTR),
  ]);

  public Module32Next = this.kernel32.func(STDCALL, 'Module32Next', BOOL, [
    VOID_PTR,
    koffi.inout(this.structsWin32.MODULEENTRY32_PTR),
  ]);

  public OpenProcess = this.kernel32.func(STDCALL, 'OpenProcess', VOID_PTR, [UINT32, BOOL, UINT32]);

  public GetLastError = this.kernel32.func(STDCALL, 'GetLastError', UINT32, []);

  public GetCurrentProcess = this.kernel32.func(STDCALL, 'GetCurrentProcess', VOID_PTR, []);

  public GetExitCodeProcess = this.kernel32.func(STDCALL, 'GetExitCodeProcess', BOOL, [
    VOID_PTR,
    koffi.out(LONG_PTR),
  ]);

  public CreateToolhelp32Snapshot = this.kernel32.func(
    STDCALL,
    'CreateToolhelp32Snapshot',
    VOID_PTR,
    [UINT32, DWORD]
  );

  public CloseHandle = this.kernel32.func(STDCALL, 'CloseHandle', BOOL, [VOID_PTR]);

  public PROCESSENTRY32_empty = (): PROCESSENTRY32_TYPE => {
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
}
