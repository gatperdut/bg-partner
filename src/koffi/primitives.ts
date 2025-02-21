import koffi, { IKoffiCType } from 'koffi';
import _ from 'lodash-es';

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
  'PTR',
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
  PTR: 'uint32',
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

export type VOID_PTR_TYPE = typeof KoffiPrimitivePtrs.VOID;
