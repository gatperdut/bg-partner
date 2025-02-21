import koffi from 'koffi';

export const BOOL = koffi.alias('BOOL', 'bool');

export const CHAR = koffi.alias('CHAR', 'char');

export const BYTE = koffi.alias('BYTE', 'unsigned char');

export const UINT8 = koffi.alias('UINT8', 'uint8');

export const INT16 = koffi.alias('INT16', 'int16');

export const UINT16 = koffi.alias('UINT16', 'uint16');

export const INT32 = koffi.alias('INT32', 'int32');

export const UINT32 = koffi.alias('UINT32', 'uint32');

export const DWORD = koffi.alias('DWORD', 'uint32');

export const LONG = koffi.alias('LONG', 'long');

export const ULONG = koffi.alias('ULONG', 'ulong');

export const PTR = koffi.alias('PTR', 'uint32');

export type NUMBER =
  | 'BOOL'
  | 'BYTE'
  | 'UINT8'
  | 'INT16'
  | 'UINT16'
  | 'INT32'
  | 'UINT32'
  | 'DWORD'
  | 'LONG'
  | 'ULONG'
  | 'PTR';

export const LONG_PTR = koffi.pointer(LONG);

export const ULONG_PTR = koffi.pointer(ULONG);

export const INT32_PTR = koffi.pointer(INT32);

export const UINT32_PTR = koffi.pointer(UINT32);
