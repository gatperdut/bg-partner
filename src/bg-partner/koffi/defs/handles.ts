import koffi from 'koffi';

export const HANDLE = koffi.alias('HANDLE', 'void');

export const HANDLE_PTR = koffi.pointer(HANDLE);

export const ADDRESS = koffi.alias('ADDRESS', 'void');

export const ADDRESS_PTR = koffi.pointer(ADDRESS);

export type HANDLE_PTR_TYPE = typeof HANDLE_PTR;

export type ADDRESS_PTR_TYPE = typeof ADDRESS_PTR;
