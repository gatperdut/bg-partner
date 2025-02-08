import koffi from 'koffi';

export const user32 = koffi.load('user32.dll');

export const kernel32 = koffi.load('kernel32.dll');

export const psapi = koffi.load('psapi.dll');

export const dwmapi = koffi.load('dwmapi.dll');

export const kernelbase = koffi.load('kernelbase.dll');
