import koffi from 'koffi';
import { STDCALL } from '../../../koffi/defs/constants';
import {
  ADDRESS_PTR,
  ADDRESS_PTR_TYPE,
  HANDLE_PTR,
  HANDLE_PTR_TYPE,
} from '../../../koffi/defs/handles';
import {
  BOOL,
  BYTE,
  CHAR,
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
} from '../../../koffi/defs/primitives';
import { blankArray } from '../../../utils';

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
  handlePtr: HANDLE_PTR_TYPE,
  address: ADDRESS_PTR_TYPE,
  value: number[],
  size: number,
  bytesRead: number[]
) => number;

export class SyscallsKernel32 {
  private kernel32 = koffi.load('kernel32.dll');

  public CHAR_ARRAY = (length: number) => {
    return koffi.array(CHAR, length, 'Array');
  };

  public MODULEENTRY32 = koffi.struct('MODULEENTRY32', {
    dwSize: UINT32,
    th32ModuleID: UINT32,
    th32ProcessID: UINT32,
    GlblcntUsage: UINT32,
    ProccntUsage: UINT32,
    modBaseAddr: koffi.pointer(BYTE),
    modBaseSize: UINT32,
    hModule: HANDLE_PTR,
    szModule: this.CHAR_ARRAY(255 + 1),
    szExePath: this.CHAR_ARRAY(260),
  });

  public MODULEENTRY32_PTR = koffi.pointer(this.MODULEENTRY32);

  public MODULEENTRY32_empty(): MODULEENTRY32_TYPE {
    return {
      dwSize: koffi.sizeof(this.MODULEENTRY32),
      th32ModuleID: 0,
      th32ProcessID: 0,
      GlblcntUsage: 0,
      ProccntUsage: 0,
      modBaseAddr: 0,
      modBaseSize: 0,
      hModule: 0,
      szModule: blankArray(255 + 1),
      szExePath: blankArray(260),
    };
  }

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
    szExeFile: this.CHAR_ARRAY(260),
  });

  public PROCESSENTRY32_PTR = koffi.pointer(this.PROCESSENTRY32);

  private ReadProcessMemoryNumberDefine(type: koffi.IKoffiCType): ReadProcessMemoryFn {
    return this.kernel32.func(STDCALL, 'ReadProcessMemory', BOOL, [
      HANDLE_PTR,
      ADDRESS_PTR,
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
    HANDLE_PTR,
    koffi.inout(this.PROCESSENTRY32_PTR),
  ]);

  public Process32Next = this.kernel32.func(STDCALL, 'Process32Next', BOOL, [
    HANDLE_PTR,
    koffi.inout(this.PROCESSENTRY32_PTR),
  ]);

  public Module32First = this.kernel32.func(STDCALL, 'Module32First', BOOL, [
    HANDLE_PTR,
    koffi.inout(this.MODULEENTRY32_PTR),
  ]);

  public Module32Next = this.kernel32.func(STDCALL, 'Module32Next', BOOL, [
    HANDLE_PTR,
    koffi.inout(this.MODULEENTRY32_PTR),
  ]);

  public OpenProcess = this.kernel32.func(STDCALL, 'OpenProcess', HANDLE_PTR, [
    UINT32,
    BOOL,
    UINT32,
  ]);

  public GetLastError = this.kernel32.func(STDCALL, 'GetLastError', UINT32, []);

  public GetCurrentProcess = this.kernel32.func(STDCALL, 'GetCurrentProcess', HANDLE_PTR, []);

  public GetExitCodeProcess = this.kernel32.func(STDCALL, 'GetExitCodeProcess', BOOL, [
    HANDLE_PTR,
    koffi.out(LONG_PTR),
  ]);

  public CreateToolhelp32Snapshot = this.kernel32.func(
    STDCALL,
    'CreateToolhelp32Snapshot',
    HANDLE_PTR,
    [UINT32, DWORD]
  );

  public CloseHandle = this.kernel32.func(STDCALL, 'CloseHandle', BOOL, [HANDLE_PTR]);

  public PROCESSENTRY32_empty = (): PROCESSENTRY32_TYPE => {
    return {
      dwSize: koffi.sizeof(this.PROCESSENTRY32),
      cntUsage: 0,
      th32ProcessID: 0,
      th32DefaultHeapID: 0,
      th32ModuleID: 0,
      cntThreads: 0,
      th32ParentProcessID: 0,
      pcPriClassBase: 0,
      dwFlags: 0,
      szExeFile: blankArray(260),
    };
  };
}
