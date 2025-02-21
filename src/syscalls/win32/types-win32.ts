import { VOID_PTR_TYPE } from '../../koffi/primitives';

export type EnumWindowsCallbackFn = (windowHandle: VOID_PTR_TYPE, somewindowId: number) => boolean;

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

export type ReadProcessMemoryFn = (
  handlePtr: VOID_PTR_TYPE,
  address: VOID_PTR_TYPE,
  value: number[],
  size: number,
  bytesRead: number[]
) => number;
