import { Primitive, PrimitiveSizesLinux } from '../primitives';
import { IOVEC_TYPE } from './types-linux';

export class HelpersLinux {
  public IOVECEmpty = (primitive: Primitive, base: bigint): IOVEC_TYPE => {
    const length: number = PrimitiveSizesLinux[primitive];

    return {
      iov_base: base ? base : new Uint8Array(length),
      iov_len: length,
    };
  };

  public dataView2Value(dataView: DataView, primitive: Primitive): number | bigint {
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
