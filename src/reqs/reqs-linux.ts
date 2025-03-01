import { execSync } from 'child_process';
import { devnull } from '../const/const-linux';
import { ReqsOs, ReqsOsObj } from './reqs';

export type ReqsLinuxObj = ReqsOsObj & {
  aslr: boolean;

  ptrace: boolean;
};

export class ReqsLinux extends ReqsOs {
  public obj: ReqsLinuxObj = {
    path: null,
    aslr: null,
    ptrace: null,
  };

  constructor() {
    super();
  }

  public run(): void {
    // path
    this.obj.path = this.pathCheck();

    // ASLR
    const aslrOut: string = execSync(`cat /proc/sys/kernel/randomize_va_space ${devnull}`)
      .toString()
      .trim();

    const aslr: number = Number.parseInt(aslrOut, 10);

    this.obj.aslr = aslr === 0;

    // ptrace_scope
    const ptraceOut: string = execSync(`cat /proc/sys/kernel/yama/ptrace_scope ${devnull}`)
      .toString()
      .trim();

    const ptrace: number = Number.parseInt(ptraceOut, 10);

    this.obj.ptrace = ptrace === 0;
  }

  public valid(): boolean {
    return this.obj.path && this.obj.aslr && this.obj.ptrace;
  }
}
