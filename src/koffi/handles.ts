import koffi from 'koffi';

export const VOID = koffi.alias('VOID', 'void');

export const VOID_PTR = koffi.pointer(VOID);

export type VOID_PTR_TYPE = typeof VOID_PTR;
