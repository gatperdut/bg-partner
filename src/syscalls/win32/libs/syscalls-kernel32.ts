import koffi, { IKoffiLib, KoffiFunction } from 'koffi';
import _ from 'lodash-es';
import { STDCALL } from '../../../const/const-win32';
import {
  KoffiPrimitivePtrs,
  KoffiPrimitives,
  Primitive,
  Primitives,
} from '../../../koffi/primitives';
import { StructsWin32 } from '../structs-win32';
import { MODULEENTRY32_TYPE, PROCESSENTRY32_TYPE, ReadProcessMemoryFn } from '../types-win32';

export class SyscallsKernel32 {
  constructor(private structsWin32: StructsWin32) {
    _.each(Primitives, (primitive: Primitive): void => {
      this.ReadProcessMemoryNumber[primitive] = this.ReadProcessMemoryNumberDefine(primitive);
    });
  }

  private kernel32: IKoffiLib = koffi.load('kernel32.dll');

  private ReadProcessMemoryNumberDefine(type: Primitive): ReadProcessMemoryFn {
    return this.kernel32.func(STDCALL, 'ReadProcessMemory', KoffiPrimitives.BOOL, [
      KoffiPrimitivePtrs.VOID,
      KoffiPrimitivePtrs.VOID,
      koffi.out(KoffiPrimitivePtrs[type]),
      KoffiPrimitives.ULONG,
      koffi.out(KoffiPrimitivePtrs.UINT32),
    ]);
  }

  public ReadProcessMemoryNumber: Record<Primitive, ReadProcessMemoryFn> = {} as Record<
    Primitive,
    ReadProcessMemoryFn
  >;

  public Process32First: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Process32First',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.PROCESSENTRY32_PTR)]
  );

  public Process32Next: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Process32Next',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.PROCESSENTRY32_PTR)]
  );

  public Module32First: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Module32First',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.MODULEENTRY32_PTR)]
  );

  public Module32Next: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Module32Next',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.MODULEENTRY32_PTR)]
  );

  public MODULEENTRY32_empty(): MODULEENTRY32_TYPE {
    return {
      dwSize: koffi.sizeof(this.structsWin32.MODULEENTRY32),
      th32ModuleID: 0,
      th32ProcessID: 0,
      GlblcntUsage: 0,
      ProccntUsage: 0,
      modBaseAddr: 0,
      modBaseSize: 0,
      hModule: 0,
      szModule: new Array(255 + 1).fill(0),
      szExePath: new Array(260).fill(0),
    };
  }

  public OpenProcess: KoffiFunction = this.kernel32.func(
    STDCALL,
    'OpenProcess',
    KoffiPrimitivePtrs.VOID,
    [KoffiPrimitives.UINT32, KoffiPrimitives.BOOL, KoffiPrimitives.UINT32]
  );

  public GetLastError: KoffiFunction = this.kernel32.func(
    STDCALL,
    'GetLastError',
    KoffiPrimitives.UINT32,
    []
  );

  public GetExitCodeProcess: KoffiFunction = this.kernel32.func(
    STDCALL,
    'GetExitCodeProcess',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.out(KoffiPrimitivePtrs.LONG)]
  );

  public CreateToolhelp32Snapshot: KoffiFunction = this.kernel32.func(
    STDCALL,
    'CreateToolhelp32Snapshot',
    KoffiPrimitivePtrs.VOID,
    [KoffiPrimitives.UINT32, KoffiPrimitives.DWORD]
  );

  public CloseHandle: KoffiFunction = this.kernel32.func(
    STDCALL,
    'CloseHandle',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID]
  );

  public PROCESSENTRY32_empty = (): PROCESSENTRY32_TYPE => {
    return {
      dwSize: koffi.sizeof(this.structsWin32.PROCESSENTRY32),
      cntUsage: 0,
      th32ProcessID: 0,
      th32DefaultHeapID: 0,
      th32ModuleID: 0,
      cntThreads: 0,
      th32ParentProcessID: 0,
      pcPriClassBase: 0,
      dwFlags: 0,
      szExeFile: new Array(260).fill(0),
    };
  };
}
