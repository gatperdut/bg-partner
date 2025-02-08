import koffi from 'koffi';
import { STDCALL } from '../constants';
import { HANDLE_PTR } from '../handles';
import { kernel32 } from '../libs';
import { BOOL, DWORD, UINT32 } from '../primitives';
import { MODULEENTRY32_PTR } from '../structs/moduleentry32';
import { PROCESSENTRY32_PTR } from '../structs/processentry32';

export const CreateToolhelp32Snapshot = kernel32.func(
  STDCALL,
  'CreateToolhelp32Snapshot',
  HANDLE_PTR,
  [UINT32, DWORD]
);

export const Process32First = kernel32.func(STDCALL, 'Process32First', BOOL, [
  HANDLE_PTR,
  koffi.inout(PROCESSENTRY32_PTR),
]);

export const Process32Next = kernel32.func(STDCALL, 'Process32Next', BOOL, [
  HANDLE_PTR,
  koffi.inout(PROCESSENTRY32_PTR),
]);

export const Module32First = kernel32.func(STDCALL, 'Module32First', BOOL, [
  HANDLE_PTR,
  koffi.inout(MODULEENTRY32_PTR),
]);

export const Module32Next = kernel32.func(STDCALL, 'Module32Next', BOOL, [
  HANDLE_PTR,
  koffi.inout(MODULEENTRY32_PTR),
]);

export const OpenProcess = kernel32.func(STDCALL, 'OpenProcess', HANDLE_PTR, [
  UINT32,
  BOOL,
  UINT32,
]);

export const CloseHandle = kernel32.func(STDCALL, 'CloseHandle', BOOL, [HANDLE_PTR]);
