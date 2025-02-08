import koffi from 'koffi';

import { STDCALL } from '../constants';
import { ADDRESS_PTR, ADDRESS_PTR_TYPE, HANDLE_PTR, HANDLE_PTR_TYPE } from '../handles';
import { kernel32 } from '../libs';
import {
  BOOL,
  BYTE,
  DWORD,
  INT16,
  INT32,
  LONG,
  NUMBER,
  UINT16,
  UINT32,
  UINT8,
  ULONG,
} from '../primitives';

type ReadProcessMemoryFn = (
  handlePtr: HANDLE_PTR_TYPE,
  address: ADDRESS_PTR_TYPE,
  value: number[],
  size: number,
  bytesRead: number[]
) => number;

const ReadProcessMemoryNumberDefine = (type: koffi.IKoffiCType): ReadProcessMemoryFn => {
  return kernel32.func(STDCALL, 'ReadProcessMemory', BOOL, [
    HANDLE_PTR,
    ADDRESS_PTR,
    koffi.out(koffi.pointer(type)),
    ULONG,
    koffi.out(koffi.pointer(UINT32)),
  ]);
};

export const ReadProcessMemoryNumber: Record<NUMBER, ReadProcessMemoryFn> = {
  BOOL: ReadProcessMemoryNumberDefine(BYTE),
  BYTE: ReadProcessMemoryNumberDefine(BYTE),
  UINT8: ReadProcessMemoryNumberDefine(UINT8),
  INT16: ReadProcessMemoryNumberDefine(INT16),
  UINT16: ReadProcessMemoryNumberDefine(UINT16),
  INT32: ReadProcessMemoryNumberDefine(INT32),
  UINT32: ReadProcessMemoryNumberDefine(UINT32),
  DWORD: ReadProcessMemoryNumberDefine(DWORD),
  LONG: ReadProcessMemoryNumberDefine(LONG),
  ULONG: ReadProcessMemoryNumberDefine(ULONG),
  PTR: ReadProcessMemoryNumberDefine(UINT32),
};

export const ReadProcessMemoryNumberSize: Record<NUMBER, number> = {
  BOOL: 1,
  BYTE: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  UINT32: 4,
  INT32: 4,
  DWORD: 4,
  LONG: 4,
  ULONG: 4,
  PTR: 4,
};
