import 'source-map-support/register';
import { linux } from '../index';
import { Entities } from './entities';
import { Memread } from './memread/memread';
import { MemreadLinux } from './memread/memread-linux';
import { MemreadWin32 } from './memread/memread-win32';
import { MemscanLinux } from './memscan/memscan-linux';
import { MemscanWin32 } from './memscan/memscan-win32';
import { ShortcutsLinux } from './shortcuts/shortcuts-linux';
import { ShortcutsWin32 } from './shortcuts/shortcuts-win32';
import { SyscallsLinux } from './syscalls/syscalls-linux';
import { SyscallsWin32 } from './syscalls/win32/syscalls-win32';
import { WindowLinux } from './window/window-linux';
import { WindowWin32 } from './window/window-win32';

export type Handlers = {
  syscalls: SyscallsLinux | SyscallsWin32;
  memread: Memread;
  memscan: MemscanLinux | MemscanWin32;
  window: WindowLinux | WindowWin32;
  entities: Entities;
  shortcuts: ShortcutsLinux | ShortcutsWin32;
};

export const handlers: Handlers = {
  syscalls: null,
  memread: null,
  memscan: null,
  window: null,
  entities: null,
  shortcuts: null,
};

export class Main {
  constructor() {
    handlers.syscalls = linux ? new SyscallsLinux() : new SyscallsWin32();

    handlers.memread = linux ? new MemreadLinux() : new MemreadWin32();

    handlers.memscan = linux ? new MemscanLinux() : new MemscanWin32();

    handlers.window = linux ? new WindowLinux() : new WindowWin32();

    handlers.entities = new Entities();

    handlers.shortcuts = linux ? new ShortcutsLinux() : new ShortcutsWin32();
  }

  public run(): void {
    setInterval(this.loop.bind(this), 300);
  }

  private loop(): void {
    if (!handlers.memscan.alive) {
      handlers.memscan.init();
    }

    handlers.memscan.run();

    if (!handlers.memscan.alive) {
      handlers.window.teardown();

      handlers.entities.teardown();

      return;
    }

    handlers.window.init();

    handlers.window.run();

    handlers.entities.run();
  }
}
