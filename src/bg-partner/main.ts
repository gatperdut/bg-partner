import 'source-map-support/register';
import { linux } from '../index';
import { Entities } from './entities';
import { KeyboardLinux } from './keyboard/keyboard-linux';
import { KeyboardWin32 } from './keyboard/keyboard-win32';
import { Linuxcalls } from './linuxcalls';
import { MemLinux } from './mem/mem-linux';
import { MemWin32 } from './mem/mem-win32';
import { Memread } from './memread/memread';
import { MemreadLinux } from './memread/memread-linux';
import { MemreadWin32 } from './memread/memread-win32';
import { Wincalls } from './wincalls';
import { WindowLinux } from './window/window-linux';
import { WindowWin32 } from './window/window-win32';

export class Main {
  private linuxcalls: Linuxcalls;

  private wincalls: Wincalls;

  public memread: Memread;

  private memHandler: MemLinux | MemWin32;

  private windowHandler: WindowLinux | WindowWin32;

  private entitiesHandler: Entities;

  private keyboardHandler: KeyboardLinux | KeyboardWin32;

  constructor() {
    this.wincalls = linux() ? null : new Wincalls();

    this.linuxcalls = linux() ? new Linuxcalls() : null;

    this.memread = linux() ? new MemreadLinux(this.linuxcalls) : new MemreadWin32(this.wincalls);

    this.memHandler = linux()
      ? new MemLinux(this.memread)
      : new MemWin32(this.wincalls, this.memread);

    this.windowHandler = linux() ? new WindowLinux() : new WindowWin32(this.wincalls);

    this.entitiesHandler = new Entities(this.windowHandler, this.memread);

    this.keyboardHandler = linux()
      ? new KeyboardLinux(this.windowHandler as WindowLinux, this.entitiesHandler)
      : new KeyboardWin32(this.windowHandler as WindowWin32, this.entitiesHandler, this.wincalls);
  }

  public run(): void {
    setInterval(this.loop.bind(this), 300);
  }

  private loop(): void {
    if (!this.memHandler.alive) {
      this.memHandler.init();
    }

    this.memHandler.run();

    if (!this.memHandler.alive) {
      this.windowHandler.teardown();

      this.entitiesHandler.teardown();

      return;
    }

    this.windowHandler.init(this.memHandler.pid);

    this.windowHandler.run(this.memHandler.pid);

    this.entitiesHandler.run(this.memHandler.targetProcess, this.memHandler.gameObjectPtrs);
  }
}
