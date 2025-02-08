import koffi from 'koffi';
import { STDCALL } from '../constants';
import { HANDLE_PTR } from '../handles';
import { kernel32, user32 } from '../libs';
import { BOOL, INT32, LONG_PTR } from '../primitives';

export const GetSystemMetrics = user32.func(STDCALL, 'GetSystemMetrics', INT32, [INT32]);

export const GetCurrentProcess = kernel32.func(STDCALL, 'GetCurrentProcess', HANDLE_PTR, []);

export const GetExitCodeProcess = kernel32.func(STDCALL, 'GetExitCodeProcess', BOOL, [
  HANDLE_PTR,
  koffi.out(LONG_PTR),
]);
