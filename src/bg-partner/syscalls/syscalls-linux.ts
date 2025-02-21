import koffi from 'koffi';
import { NUMBER } from '../koffi/defs/primitives';
import { NumberSizesLinux } from '../utils';

export class SyscallsLinux {
  public libc = koffi.load('libc.so.6');

  public iovec = koffi.struct('iovec', {
    iov_base: 'void *', // Pointer to the memory address
    iov_len: 'int', // Length of the memory region
  });

  public process_vm_readv = this.libc.func(
    'int process_vm_readv(int pid, iovec *local_iov, unsigned long liovcnt, iovec *remote_iov, unsigned long riovcnt, unsigned long flags)'
  );

  public readNumber(pid: number, ptr: bigint, type: NUMBER): number | bigint {
    const length: number = NumberSizesLinux[type];

    const buf = new Uint8Array(length);

    const local_iov = [{ iov_base: buf, iov_len: length }];

    const remote_iov = [{ iov_base: ptr, iov_len: length }];

    this.process_vm_readv(pid, local_iov, 1, remote_iov, 1, 0);

    const dataView = new DataView(local_iov[0].iov_base.buffer);

    switch (type) {
      case 'BOOL':
        return dataView.getInt8(0);

      case 'BYTE':
        return dataView.getInt8(0);

      case 'UINT8':
        return dataView.getUint8(0);

      case 'INT16':
        return dataView.getInt16(0, true);

      case 'UINT16':
        return dataView.getUint16(0, true);

      case 'INT32':
        return dataView.getInt32(0, true);

      case 'UINT32':
        return dataView.getUint32(0, true);

      case 'DWORD':
        return dataView.getInt32(0, true);

      case 'LONG':
        return dataView.getInt32(0, true);

      case 'ULONG':
        return dataView.getInt32(0, true);

      case 'PTR':
        return dataView.getBigInt64(0, true);
    }
  }
}
