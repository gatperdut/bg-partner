import { Primitive, PrimitiveSizesLinux } from '../../koffi/primitives';
import { SyscallsLibc } from './libs/libc';
import { StructsLinux } from './structs-linux';

export class SyscallsLinux {
  public structsLinux: StructsLinux = new StructsLinux();

  public syscallsLibc: SyscallsLibc = new SyscallsLibc(this.structsLinux);

  public readNumber(pid: number, ptr: bigint, primitive: Primitive): number | bigint {
    const length: number = PrimitiveSizesLinux[primitive];

    const buf = new Uint8Array(length);

    const local_iov = [{ iov_base: buf, iov_len: length }];

    const remote_iov = [{ iov_base: ptr, iov_len: length }];

    this.syscallsLibc.process_vm_readv(pid, local_iov, 1, remote_iov, 1, 0);

    const dataView = new DataView(local_iov[0].iov_base.buffer);

    switch (primitive) {
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

      case 'ADDR':
        return dataView.getBigInt64(0, true);
    }
  }
}
