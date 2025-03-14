import { STDCALL } from '@const/const-win32';
import { KoffiPrimitivePtrs, KoffiPrimitives, Primitive, Primitives } from '@syscalls/primitives';
import { StructsWin32 } from '@syscalls/win32/structs-win32';
import { ReadProcessMemoryFn } from '@syscalls/win32/types-win32';
import koffi, { IKoffiLib, KoffiFunction } from 'koffi';
import * as _ from 'lodash-es';

export class Kernel32 {
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
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.PROCESSENTRY32PTR)]
  );

  public Process32Next: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Process32Next',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.PROCESSENTRY32PTR)]
  );

  public Module32First: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Module32First',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.MODULEENTRY32PTR)]
  );

  public Module32Next: KoffiFunction = this.kernel32.func(
    STDCALL,
    'Module32Next',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.inout(this.structsWin32.MODULEENTRY32PTR)]
  );

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
}
