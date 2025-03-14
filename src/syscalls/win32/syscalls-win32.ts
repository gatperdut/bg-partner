import { HelpersWin32 } from '@syscalls/win32/helpers-win32';
import { Dwmapi } from '@syscalls/win32/libs/dwmapi';
import { Kernel32 } from '@syscalls/win32/libs/kernel32';
import { User32 } from '@syscalls/win32/libs/user32';
import { StructsWin32 } from '@syscalls/win32/structs-win32';

export class SyscallsWin32 {
  public structs: StructsWin32 = new StructsWin32();

  public user32: User32 = new User32(this.structs);

  public kernel32: Kernel32 = new Kernel32(this.structs);

  public dwmapi: Dwmapi = new Dwmapi(this.structs);

  public helpers: HelpersWin32 = new HelpersWin32(this.user32, this.kernel32, this.structs);
}
