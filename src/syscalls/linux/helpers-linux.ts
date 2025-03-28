import { Libc } from '@syscalls/linux/libs/libc';
import { IOVEC } from '@syscalls/linux/types-linux';
import { Primitive, PrimitiveSizesLinux, Value } from '@syscalls/primitives';

export class HelpersLinux {
  constructor(private syscallsLibc: Libc) {
    // Empty
  }

  public IOVECEmpty = (primitive: Primitive, base: bigint): IOVEC => {
    const length: number = PrimitiveSizesLinux[primitive];

    return {
      iov_base: base ? base : new Uint8Array(length),
      iov_len: length,
    };
  };

  public readNumber(pid: number, ptr: bigint, primitive: Primitive): Value {
    const iovecsLocal: IOVEC[] = [this.IOVECEmpty(primitive, null)];

    const iovecsRemote: IOVEC[] = [this.IOVECEmpty(primitive, ptr)];

    this.syscallsLibc.process_vm_readv(pid, iovecsLocal, 1, iovecsRemote, 1, 0);

    const dataView = new DataView((iovecsLocal[0].iov_base as Uint8Array).buffer);

    return this.dataView2Value(dataView, primitive);
  }

  private dataView2Value(dataView: DataView, primitive: Primitive): Value {
    switch (primitive) {
      case 'VOID':
        return null;
      case 'BOOL':
        return dataView.getInt8(0);
      case 'CHAR':
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
      default:
        console.error('Unknown primitive.');
        return null;
    }
  }
}
