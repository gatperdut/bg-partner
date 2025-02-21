import { SyscallsDwmapi } from './libs/syscalls-dwmapi';
import { SyscallsKernel32 } from './libs/syscalls-kernel32';
import { SyscallsUser32 } from './libs/syscalls-user32';

export class SyscallsWin32 {
  public syscallsUser32 = new SyscallsUser32();

  public syscallsKernel32 = new SyscallsKernel32();

  public syscallsDwmapi = new SyscallsDwmapi();
}
