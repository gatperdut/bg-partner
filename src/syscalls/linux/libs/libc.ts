import koffi, { IKoffiLib, KoffiFunction } from 'koffi';
import { KoffiPrimitives } from '../../primitives';
import { StructsLinux } from '../structs-linux';

export class SyscallsLibc {
  constructor(private structsLinux: StructsLinux) {
    // Empty
  }

  public libc: IKoffiLib = koffi.load('libc.so.6');

  public process_vm_readv: KoffiFunction = this.libc.func(
    'process_vm_readv',
    KoffiPrimitives.INT32,
    [
      KoffiPrimitives.INT32,
      this.structsLinux.IOVEC_PTR,
      KoffiPrimitives.ULONG,
      this.structsLinux.IOVEC_PTR,
      KoffiPrimitives.ULONG,
      KoffiPrimitives.ULONG,
    ]
  );
}
