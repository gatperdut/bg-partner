import { STDCALL } from '../constants';
import { kernel32 } from '../libs';
import { UINT32 } from '../primitives';

export const GetLastError = kernel32.func(STDCALL, 'GetLastError', UINT32, []);
