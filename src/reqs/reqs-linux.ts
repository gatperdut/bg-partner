import { execSync } from 'child_process';
import { devnull } from '../const/const-linux';

export type ReqsLinuxObj = {
  aslr: boolean;

  ptrace: boolean;
};

export class ReqsLinux {
  public obj: ReqsLinuxObj = {
    aslr: null,
    ptrace: null,
  };

  constructor() {
    // Empty
  }

  public run(): void {
    const aslrOut: string = execSync(`cat /proc/sys/kernel/randomize_va_space ${devnull}`)
      .toString()
      .trim();

    const aslr: number = Number.parseInt(aslrOut, 10);

    const ptraceOut: string = execSync(`cat /proc/sys/kernel/yama/ptrace_scope ${devnull}`)
      .toString()
      .trim();

    const ptrace: number = Number.parseInt(ptraceOut, 10);

    this.obj.aslr = aslr === 0;

    this.obj.ptrace = ptrace === 0;
  }
}
