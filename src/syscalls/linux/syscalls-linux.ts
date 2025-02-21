import { Primitive } from '../primitives';
import { HelpersLinux } from './helpers-linux';
import { SyscallsLibc } from './libs/libc';
import { StructsLinux } from './structs-linux';
import { IOVEC_TYPE } from './types-linux';

export class SyscallsLinux {
  public structsLinux: StructsLinux = new StructsLinux();

  public syscallsLibc: SyscallsLibc = new SyscallsLibc(this.structsLinux);

  public helpersLinux: HelpersLinux = new HelpersLinux();

  public readNumber(pid: number, ptr: bigint, primitive: Primitive): number | bigint {
    const iovecsLocal: IOVEC_TYPE[] = [this.helpersLinux.IOVECEmpty(primitive, null)];

    const iovecsRemote: IOVEC_TYPE[] = [this.helpersLinux.IOVECEmpty(primitive, ptr)];

    this.syscallsLibc.process_vm_readv(pid, iovecsLocal, 1, iovecsRemote, 1, 0);

    const dataView = new DataView((iovecsLocal[0].iov_base as Uint8Array).buffer);

    return this.helpersLinux.dataView2Value(dataView, primitive);
  }
}
