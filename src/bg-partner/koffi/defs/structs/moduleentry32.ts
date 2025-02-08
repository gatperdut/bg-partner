import koffi from 'koffi';
import { blankArray } from '../../../utils';
import { CHAR_ARRAY } from '../arrays';
import { HANDLE_PTR } from '../handles';
import { BYTE, UINT32 } from '../primitives';

export const MODULEENTRY32 = koffi.struct('MODULEENTRY32', {
  dwSize: UINT32,
  th32ModuleID: UINT32,
  th32ProcessID: UINT32,
  GlblcntUsage: UINT32,
  ProccntUsage: UINT32,
  modBaseAddr: koffi.pointer(BYTE),
  modBaseSize: UINT32,
  hModule: HANDLE_PTR,
  szModule: CHAR_ARRAY(255 + 1),
  szExePath: CHAR_ARRAY(260),
});

export const MODULEENTRY32_PTR = koffi.pointer(MODULEENTRY32);

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

export const MODULEENTRY32_empty = (): MODULEENTRY32_TYPE => {
  return {
    dwSize: koffi.sizeof(MODULEENTRY32),
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
};
