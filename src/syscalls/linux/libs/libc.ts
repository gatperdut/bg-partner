import koffi, { IKoffiLib, KoffiFunction } from 'koffi';
import { StructsLinux } from '../structs-linux';

export class SyscallsLibc {
  constructor(private structsLinux: StructsLinux) {
    // Empty
  }

  public libc: IKoffiLib = koffi.load('libc.so.6');

  public process_vm_readv: KoffiFunction = this.libc.func(
    'int process_vm_readv(int pid, iovec *local_iov, unsigned long liovcnt, iovec *remote_iov, unsigned long riovcnt, unsigned long flags)'
  );
}
