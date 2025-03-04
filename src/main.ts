import 'source-map-support/register';
import { Entities } from './entities/entities';
import { linux } from './index';
import { MemreadLinux } from './memread/memread-linux';
import { MemreadWin32 } from './memread/memread-win32';
import { MemscanLinux } from './memscan/memscan-linux';
import { MemscanWin32 } from './memscan/memscan-win32';
import { ShortcutsLinux } from './shortcuts/shortcuts-linux';
import { ShortcutsWin32 } from './shortcuts/shortcuts-win32';
import { SyscallsLinux } from './syscalls/linux/syscalls-linux';
import { SyscallsWin32 } from './syscalls/win32/syscalls-win32';

import { Components } from './components/components';
import { Config } from './config/config';
import { config, handlers } from './handlers';
import { ReqsLinux } from './reqs/reqs-linux';
import { Control } from './views/control/control';
import { WindowLinux } from './window/window-linux';
import { WindowWin32 } from './window/window-win32';

export class Main {
  constructor() {
    handlers.reqs = linux ? new ReqsLinux() : null;

    handlers.config = new Config();

    handlers.syscalls = linux ? new SyscallsLinux() : new SyscallsWin32();

    handlers.memread = linux ? new MemreadLinux() : new MemreadWin32();

    handlers.memscan = linux ? new MemscanLinux() : new MemscanWin32();

    handlers.window = linux ? new WindowLinux() : new WindowWin32();

    handlers.entities = new Entities();

    handlers.shortcuts = linux ? new ShortcutsLinux() : new ShortcutsWin32();

    handlers.control = new Control();

    handlers.components = new Components();
  }

  public run(): void {
    setInterval(this.loop.bind(this), config().obj.ms);
  }

  private loop(): void {
    if (linux) {
      handlers.reqs.run();
    }

    if (!handlers.memscan.alive) {
      handlers.memscan.init();
    }

    handlers.memscan.run();

    handlers.control.run();

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
