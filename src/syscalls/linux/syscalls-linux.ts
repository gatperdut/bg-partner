import { HelpersLinux } from './helpers-linux';
import { SyscallsLibc } from './libs/libc';
import { StructsLinux } from './structs-linux';

export class SyscallsLinux {
  public structsLinux: StructsLinux = new StructsLinux();

  public syscallsLibc: SyscallsLibc = new SyscallsLibc(this.structsLinux);

  public helpersLinux: HelpersLinux = new HelpersLinux(this.syscallsLibc);
}
