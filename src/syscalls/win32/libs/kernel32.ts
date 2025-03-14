import { STDCALL } from '@const/const-win32';
import { KoffiPrimitivePtrs, KoffiPrimitives, Primitive, Primitives } from '@syscalls/primitives';
import { StructsWin32 } from '@syscalls/win32/structs-win32';
import { ReadProcessMemoryFn } from '@syscalls/win32/types-win32';
import * as koffi from 'koffi';
import * as _ from 'lodash-es';

export class Kernel32 {
  private kernel32: koffi.IKoffiLib = koffi.load('kernel32.dll');

  public Process32First: koffi.KoffiFunction;
  public Process32Next: koffi.KoffiFunction;
  public Module32First: koffi.KoffiFunction;
  public Module32Next: koffi.KoffiFunction;

  constructor(private structsWin32: StructsWin32) {
    _.each(Primitives, (primitive: Primitive): void => {
      this.ReadProcessMemoryNumber[primitive] = this.ReadProcessMemoryNumberDefine(primitive);
    });

    this.Process32First_Setup();
    this.Process32Next_Setup();
    this.Module32First_Setup();
    this.Module32Next_Setup();
  }

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
  private Process32First_Setup(): void {
    this.Process32First = this.kernel32.func(STDCALL, 'Process32First', KoffiPrimitives.BOOL, [
      KoffiPrimitivePtrs.VOID,
      koffi.inout(this.structsWin32.PROCESSENTRY32PTR),
    ]);
  }

  private Process32Next_Setup(): void {
    this.Process32Next = this.kernel32.func(STDCALL, 'Process32Next', KoffiPrimitives.BOOL, [
      KoffiPrimitivePtrs.VOID,
      koffi.inout(this.structsWin32.PROCESSENTRY32PTR),
    ]);
  }

  private Module32First_Setup(): void {
    this.Module32First = this.kernel32.func(STDCALL, 'Module32First', KoffiPrimitives.BOOL, [
      KoffiPrimitivePtrs.VOID,
      koffi.inout(this.structsWin32.MODULEENTRY32PTR),
    ]);
  }

  private Module32Next_Setup(): void {
    this.Module32Next = this.kernel32.func(STDCALL, 'Module32Next', KoffiPrimitives.BOOL, [
      KoffiPrimitivePtrs.VOID,
      koffi.inout(this.structsWin32.MODULEENTRY32PTR),
    ]);
  }

  public OpenProcess: koffi.KoffiFunction = this.kernel32.func(
    STDCALL,
    'OpenProcess',
    KoffiPrimitivePtrs.VOID,
    [KoffiPrimitives.UINT32, KoffiPrimitives.BOOL, KoffiPrimitives.UINT32]
  );

  public GetLastError: koffi.KoffiFunction = this.kernel32.func(
    STDCALL,
    'GetLastError',
    KoffiPrimitives.UINT32,
    []
  );

  public GetExitCodeProcess: koffi.KoffiFunction = this.kernel32.func(
    STDCALL,
    'GetExitCodeProcess',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID, koffi.out(KoffiPrimitivePtrs.LONG)]
  );

  public CreateToolhelp32Snapshot: koffi.KoffiFunction = this.kernel32.func(
    STDCALL,
    'CreateToolhelp32Snapshot',
    KoffiPrimitivePtrs.VOID,
    [KoffiPrimitives.UINT32, KoffiPrimitives.DWORD]
  );

  public CloseHandle: koffi.KoffiFunction = this.kernel32.func(
    STDCALL,
    'CloseHandle',
    KoffiPrimitives.BOOL,
    [KoffiPrimitivePtrs.VOID]
  );
}
