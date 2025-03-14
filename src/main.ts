import { Chitin } from '@chitin/chitin';
import { Tlk } from '@chitin/res/impl/res-tlk';
import { Config } from '@config/config';
import { Entities } from '@entities/entities';
import { config, handlers } from '@handlers';
import { MemreadLinux } from '@memread/memread-linux';
import { MemreadWin32 } from '@memread/memread-win32';
import { MemscanLinux } from '@memscan/memscan-linux';
import { MemscanWin32 } from '@memscan/memscan-win32';
import { ReqsLinux } from '@reqs/reqs-linux';
import { ReqsWin32 } from '@reqs/reqs-win32';
import { ShortcutsLinux } from '@shortcuts/shortcuts-linux';
import { ShortcutsWin32 } from '@shortcuts/shortcuts-win32';
import { SyscallsLinux } from '@syscalls/linux/syscalls-linux';
import { SyscallsWin32 } from '@syscalls/win32/syscalls-win32';
import { Timetracker } from '@time/timetracker';
import { Control } from '@views/control/control';
import { WindowLinux } from '@window/window-linux';
import { WindowWin32 } from '@window/window-win32';
import * as os from 'os';
import 'source-map-support/register';
import { Components } from 'src/components/components';

export class Main {
  constructor() {
    handlers.linux = os.platform() === 'linux';

    handlers.config = new Config();

    if (handlers.config.quitting) {
      return;
    }

    handlers.reqs = handlers.linux ? new ReqsLinux() : new ReqsWin32();

    handlers.tlk = new Tlk();

    handlers.chitin = new Chitin();

    handlers.chitin.setup();

    handlers.syscalls = handlers.linux ? new SyscallsLinux() : new SyscallsWin32();

    handlers.memread = handlers.linux ? new MemreadLinux() : new MemreadWin32();

    handlers.memscan = handlers.linux ? new MemscanLinux() : new MemscanWin32();

    handlers.window = handlers.linux ? new WindowLinux() : new WindowWin32();

    handlers.entities = new Entities();

    handlers.shortcuts = handlers.linux ? new ShortcutsLinux() : new ShortcutsWin32();

    handlers.control = new Control();

    handlers.components = new Components();

    handlers.timetracker = new Timetracker();
  }

  public run(): void {
    if (handlers.config.quitting) {
      return;
    }

    setInterval(this.loop.bind(this), config().obj.ms);
  }

  private loop(): void {
    if (handlers.linux) {
      handlers.reqs.run();
    }

    if (!handlers.memscan.alive) {
      handlers.memscan.init();
    }

    handlers.memscan.run();

    handlers.control.run();

    if (!handlers.memscan.alive || !handlers.reqs.valid()) {
      handlers.window.teardown();

      handlers.entities.teardown();

      return;
    }

    handlers.window.init();

    handlers.window.run();

    handlers.entities.run();
  }
}
