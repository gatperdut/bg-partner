import { devnull } from '@const/const-linux';
import { ReqsOs } from '@reqs/reqs';
import { execSync } from 'child_process';

export type ReqsLinuxObj = {
  aslr: boolean;

  ptrace: boolean;

  apparmor: boolean;
};

export class ReqsLinux extends ReqsOs {
  public obj: ReqsLinuxObj = {
    aslr: null,
    ptrace: null,
    apparmor: null,
  };

  public run(): void {
    let ptraceOut: string;

    let aslrOut: string;

    let apparmorOut: string;

    try {
      aslrOut = execSync(`cat /proc/sys/kernel/randomize_va_space ${devnull}`).toString().trim();

      ptraceOut = execSync(`cat /proc/sys/kernel/yama/ptrace_scope ${devnull}`).toString().trim();

      apparmorOut = execSync(
        `cat /proc/sys/kernel/apparmor_restrict_unprivileged_userns ${devnull}`
      )
        .toString()
        .trim();
    } catch (err) {
      return;
    }
    const aslr: number = Number.parseInt(aslrOut, 10);

    const ptrace: number = Number.parseInt(ptraceOut, 10);

    const apparmor: number = Number.parseInt(apparmorOut, 10);

    this.obj.aslr = aslr === 0;

    this.obj.ptrace = ptrace === 0;

    this.obj.apparmor = apparmor === 0;
  }

  public valid(): boolean {
    return this.obj.aslr && this.obj.ptrace && this.obj.apparmor;
  }
}
