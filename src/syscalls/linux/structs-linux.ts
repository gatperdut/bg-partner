import koffi, { IKoffiCType } from 'koffi';

export class StructsLinux {
  public iovec: IKoffiCType = koffi.struct('iovec', {
    iov_base: 'void *',
    iov_len: 'int',
  });
}
