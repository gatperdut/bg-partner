import koffi from 'koffi';
import { STDCALL } from '../constants';
import { HANDLE_PTR } from '../handles';
import { dwmapi, user32 } from '../libs';
import { BOOL, INT32, LONG, UINT32 } from '../primitives';
import { RECT_PTR } from '../structs/rect';

export const GetWindowThreadProcessId = user32.func(STDCALL, 'GetWindowThreadProcessId', LONG, [
  HANDLE_PTR,
  koffi.out(koffi.pointer(LONG)),
]);

export const EnumWindowsCallbackProto = koffi.proto(
  'bool __stdcall enumWindowsCallback(_In_ void* hwnd, _In_ long lParam)'
);

export const EnumWindows = user32.func(STDCALL, 'EnumWindows', 'bool', [
  koffi.pointer(EnumWindowsCallbackProto),
  LONG,
]);

export const DwmGetWindowAttribute = dwmapi.func(STDCALL, 'DwmGetWindowAttribute', LONG, [
  HANDLE_PTR,
  LONG,
  koffi.out(RECT_PTR),
  LONG,
]);

export const GetForegroundWindow = user32.func(STDCALL, 'GetForegroundWindow', HANDLE_PTR, []);

export const SetForegroundWindow = user32.func(STDCALL, 'SetForegroundWindow', HANDLE_PTR, [
  HANDLE_PTR,
]);

export const SetWindowLongA = user32.func(STDCALL, 'SetWindowLongA', LONG, [
  HANDLE_PTR,
  INT32,
  LONG,
]);

export const ShowWindow = user32.func(STDCALL, 'ShowWindow', BOOL, [HANDLE_PTR, INT32]);

export const SetWindowPos = user32.func(STDCALL, 'SetWindowPos', BOOL, [
  HANDLE_PTR,
  HANDLE_PTR,
  INT32,
  INT32,
  INT32,
  INT32,
  UINT32,
]);
