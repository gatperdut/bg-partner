import koffi from 'koffi';
import { blankArray } from '../../../utils';
import { CHAR_ARRAY } from '../arrays';
import { LONG, UINT32, ULONG } from '../primitives';

export const PROCESSENTRY32 = koffi.struct('PROCESSENTRY32', {
  dwSize: UINT32,
  cntUsage: UINT32,
  th32ProcessID: UINT32,
  th32DefaultHeapID: koffi.pointer(ULONG),
  th32ModuleID: UINT32,
  cntThreads: UINT32,
  th32ParentProcessID: UINT32,
  pcPriClassBase: LONG,
  dwFlags: UINT32,
  szExeFile: CHAR_ARRAY(260),
});

export const PROCESSENTRY32_PTR = koffi.pointer(PROCESSENTRY32);

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

export const PROCESSENTRY32_empty = (): PROCESSENTRY32_TYPE => {
  return {
    dwSize: koffi.sizeof(PROCESSENTRY32),
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
