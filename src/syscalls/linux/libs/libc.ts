import { StructsLinux } from '@syscalls/linux/structs-linux';
import { KoffiPrimitives } from '@syscalls/primitives';
import koffi, { IKoffiLib, KoffiFunction } from 'koffi';

export class Libc {
  public libc: IKoffiLib = koffi.load('libc.so.6');

  public process_vm_readv: KoffiFunction;

  constructor(private structsLinux: StructsLinux = null) {
    this.process_vm_readv_Setup();
  }

  private process_vm_readv_Setup(): void {
    this.process_vm_readv = this.libc.func('process_vm_readv', KoffiPrimitives.INT32, [
      KoffiPrimitives.INT32,
      this.structsLinux.IOVECPTR,
      KoffiPrimitives.ULONG,
      this.structsLinux.IOVECPTR,
      KoffiPrimitives.ULONG,
      KoffiPrimitives.ULONG,
    ]);
  }
}
