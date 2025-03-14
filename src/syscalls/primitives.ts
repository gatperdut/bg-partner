import koffi, { IKoffiCType } from 'koffi';
import _ from 'lodash';

export const Primitives = [
  'VOID',
  'BOOL',
  'CHAR',
  'BYTE',
  'UINT8',
  'INT16',
  'UINT16',
  'INT32',
  'UINT32',
  'DWORD',
  'LONG',
  'ULONG',
  'ADDR',
] as const;

export type Primitive = (typeof Primitives)[number];

const Primitive2CType: Record<Primitive, string> = {
  VOID: 'void',
  BOOL: 'bool',
  CHAR: 'char',
  BYTE: 'unsigned char',
  UINT8: 'uint8',
  INT16: 'int16',
  UINT16: 'uint16',
  INT32: 'int32',
  UINT32: 'uint32',
  DWORD: 'uint32',
  LONG: 'long',
  ULONG: 'ulong',
  ADDR: 'uint32',
};

export const KoffiPrimitives: Record<Primitive, IKoffiCType> = {} as Record<Primitive, IKoffiCType>;

export const KoffiPrimitivePtrs: Record<Primitive, IKoffiCType> = {} as Record<
  Primitive,
  IKoffiCType
>;

_.each(Primitives, (primitive: Primitive): void => {
  KoffiPrimitives[primitive] = koffi.alias(primitive, Primitive2CType[primitive]);

  KoffiPrimitivePtrs[primitive] = koffi.pointer(KoffiPrimitives[primitive]);
});

export const PrimitiveSizesWin32: Record<Primitive, number> = {
  VOID: null,
  BOOL: 1,
  CHAR: 1,
  BYTE: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  UINT32: 4,
  INT32: 4,
  DWORD: 4,
  LONG: 4,
  ULONG: 4,
  ADDR: 4,
};

export const PrimitiveSizesLinux: Record<Primitive, number> = {
  VOID: null,
  BOOL: 1,
  CHAR: 1,
  BYTE: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  UINT32: 4,
  INT32: 4,
  DWORD: 4,
  LONG: 4,
  ULONG: 4,
  ADDR: 8,
};

export type VOIDPTR = typeof KoffiPrimitivePtrs.VOID;

export type Value = number | bigint;
