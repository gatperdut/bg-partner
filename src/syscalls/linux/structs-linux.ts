import { KoffiPrimitivePtrs, KoffiPrimitives } from '@syscalls/primitives';
import * as koffi from 'koffi';

export class StructsLinux {
  public IOVEC: koffi.IKoffiCType = koffi.struct('IOVEC', {
    iov_base: KoffiPrimitivePtrs.VOID,
    iov_len: KoffiPrimitives.INT32,
  });

  public IOVECPTR: koffi.IKoffiCType = koffi.pointer(this.IOVEC);
}
