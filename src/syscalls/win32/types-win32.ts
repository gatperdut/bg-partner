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
  th32ModuleID: number;
  th32ProcessID: number;
  GlblcntUsage: number;
  ProccntUsage: number;
  modBaseAddr: number;
  modBaseSize: number;
  hModule: number;
  szModule: number[];
  szExePath: number[];
};

export type RECT = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type POINT = {
  x: number;
  y: number;
};

export type ReadProcessMemoryFn = (
  handlePtr: VOIDPTR,
  address: VOIDPTR,
  value: number[],
  size: number,
  bytesRead: number[]
) => number;
