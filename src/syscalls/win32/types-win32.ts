import { VOIDPTR } from '../primitives';

export type EnumWindowsCallbackFn = (handle: VOIDPTR, somewindowId: number) => boolean;

export type PROCESSENTRY32 = {
  dwSize: number;
  cntUsage: number;
  th32ProcessID: number;
  th32DefaultHeapID: number;
  th32ModuleID: number;
  cntThreads: number;
  th32ParentProcessID: number;
  pcPriClassBase: number;
  dwFlags: number;
  szExeFile: number[];
};

export type MODULEENTRY32 = {
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
  handlePtr: VOIDPTR,
  address: VOIDPTR,
  value: number[],
  size: number,
  bytesRead: number[]
) => number;
