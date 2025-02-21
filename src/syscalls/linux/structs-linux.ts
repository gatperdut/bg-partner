import koffi, { IKoffiCType } from 'koffi';
import { KoffiPrimitivePtrs, KoffiPrimitives } from '../primitives';

export class StructsLinux {
  public IOVEC: IKoffiCType = koffi.struct('IOVEC', {
    iov_base: KoffiPrimitivePtrs.VOID,
    iov_len: KoffiPrimitives.INT32,
  });

  public IOVECPTR: IKoffiCType = koffi.pointer(this.IOVEC);
}
