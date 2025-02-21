import { HelpersWin32 } from './helpers-win32';
import { SyscallsDwmapi } from './libs/syscalls-dwmapi';
import { SyscallsKernel32 } from './libs/syscalls-kernel32';
import { SyscallsUser32 } from './libs/syscalls-user32';
import { StructsWin32 } from './structs-win32';

export class SyscallsWin32 {
  public helpers: HelpersWin32 = new HelpersWin32();

  public structs: StructsWin32 = new StructsWin32(this.helpers);

  public syscallsUser32 = new SyscallsUser32(this.structs);

  public syscallsKernel32 = new SyscallsKernel32(this.structs);

  public syscallsDwmapi = new SyscallsDwmapi(this.structs);
}
