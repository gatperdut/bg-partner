import { HelpersLinux } from './helpers-linux';
import { Libc } from './libs/libc';
import { StructsLinux } from './structs-linux';

export class SyscallsLinux {
  public structs: StructsLinux = new StructsLinux();

  public libc: Libc = new Libc(this.structs);

  public helpers: HelpersLinux = new HelpersLinux(this.libc);
}
