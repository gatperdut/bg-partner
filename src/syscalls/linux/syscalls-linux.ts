import { HelpersLinux } from '@syscalls/linux/helpers-linux';
import { Libc } from '@syscalls/linux/libs/libc';
import { StructsLinux } from '@syscalls/linux/structs-linux';

export class SyscallsLinux {
  public structs: StructsLinux = new StructsLinux();

  public libc: Libc = new Libc(this.structs);

  public helpers: HelpersLinux = new HelpersLinux(this.libc);
}
