import { HelpersWin32 } from './helpers-win32';
import { SyscallsDwmapi } from './libs/syscalls-dwmapi';
import { SyscallsKernel32 } from './libs/syscalls-kernel32';
import { SyscallsUser32 } from './libs/syscalls-user32';
import { StructsWin32 } from './structs-win32';

export class SyscallsWin32 {
  public structsWin32: StructsWin32 = new StructsWin32();

  public syscallsUser32: SyscallsUser32 = new SyscallsUser32(this.structsWin32);

  public syscallsKernel32: SyscallsKernel32 = new SyscallsKernel32(this.structsWin32);

  public syscallsDwmapi: SyscallsDwmapi = new SyscallsDwmapi(this.structsWin32);

  public helpersWin32: HelpersWin32 = new HelpersWin32(this.syscallsUser32, this.structsWin32);
}
