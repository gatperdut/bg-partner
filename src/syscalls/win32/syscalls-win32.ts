import { HelpersWin32 } from './helpers-win32';
import { Dwmapi } from './libs/dwmapi';
import { Kernel32 } from './libs/kernel32';
import { User32 } from './libs/user32';
import { StructsWin32 } from './structs-win32';

export class SyscallsWin32 {
  public structs: StructsWin32 = new StructsWin32();

  public user32: User32 = new User32(this.structs);

  public kernel32: Kernel32 = new Kernel32(this.structs);

  public dwmapi: Dwmapi = new Dwmapi(this.structs);

  public helpers: HelpersWin32 = new HelpersWin32(this.user32, this.kernel32, this.structs);
}
