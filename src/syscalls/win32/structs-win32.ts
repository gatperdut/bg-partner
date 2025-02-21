import koffi, { IKoffiCType } from 'koffi';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '../primitives';

export class StructsWin32 {
  public RECT: IKoffiCType = koffi.struct('RECT', {
    left: KoffiPrimitives.UINT32,
    top: KoffiPrimitives.UINT32,
    right: KoffiPrimitives.UINT32,
    bottom: KoffiPrimitives.UINT32,
  });

  public RECTPTR: IKoffiCType = koffi.pointer(this.RECT);

  public MODULEENTRY32: IKoffiCType = koffi.struct('MODULEENTRY32', {
    dwSize: KoffiPrimitives.UINT32,
    th32ModuleID: KoffiPrimitives.UINT32,
    th32ProcessID: KoffiPrimitives.UINT32,
    GlblcntUsage: KoffiPrimitives.UINT32,
    ProccntUsage: KoffiPrimitives.UINT32,
    modBaseAddr: koffi.pointer(KoffiPrimitives.BYTE),
    modBaseSize: KoffiPrimitives.UINT32,
    hModule: KoffiPrimitivePtrs.VOID,
    szModule: koffi.array(KoffiPrimitives.CHAR, 255 + 1, 'Array'),
    szExePath: koffi.array(KoffiPrimitives.CHAR, 260, 'Array'),
  });

  public MODULEENTRY32PTR: IKoffiCType = koffi.pointer(this.MODULEENTRY32);

  public PROCESSENTRY32: IKoffiCType = koffi.struct('PROCESSENTRY32', {
    dwSize: KoffiPrimitives.UINT32,
    cntUsage: KoffiPrimitives.UINT32,
    th32ProcessID: KoffiPrimitives.UINT32,
    th32DefaultHeapID: koffi.pointer(KoffiPrimitives.ULONG),
    th32ModuleID: KoffiPrimitives.UINT32,
    cntThreads: KoffiPrimitives.UINT32,
    th32ParentProcessID: KoffiPrimitives.UINT32,
    pcPriClassBase: KoffiPrimitives.LONG,
    dwFlags: KoffiPrimitives.UINT32,
    szExeFile: koffi.array(KoffiPrimitives.CHAR, 260, 'Array'),
  });

  public PROCESSENTRY32PTR: IKoffiCType = koffi.pointer(this.PROCESSENTRY32);

  public POINT: IKoffiCType = koffi.struct('POINT', {
    x: KoffiPrimitives.LONG,
    y: KoffiPrimitives.LONG,
  });

  public POINTPTR: IKoffiCType = koffi.pointer(this.POINT);
}
