import { StructsLinux } from '@syscalls/linux/structs-linux';
import { KoffiPrimitives } from '@syscalls/primitives';
import koffi, { IKoffiLib, KoffiFunction } from 'koffi';

export class Libc {
  constructor(private structsLinux: StructsLinux) {
    // Empty
  }

  public libc: IKoffiLib = koffi.load('libc.so.6');

  public process_vm_readv: KoffiFunction = this.libc.func(
    'process_vm_readv',
    KoffiPrimitives.INT32,
    [
      KoffiPrimitives.INT32,
      this.structsLinux.IOVECPTR,
      KoffiPrimitives.ULONG,
      this.structsLinux.IOVECPTR,
      KoffiPrimitives.ULONG,
      KoffiPrimitives.ULONG,
    ]
  );
}
