import os from 'os';
import 'source-map-support/register';
import { EntitiesHandler } from './entities.handler';
import { KeyboardLinux } from './keyboard/keyboard-linux';
import { KeyboardWin32 } from './keyboard/keyboard-win32';
import { MemHandler } from './mem.handler';
import { WindowLinux } from './window/window-linux';
import { WindowWin32 } from './window/window-win32';

const linux = (): boolean => {
  return os.platform() === 'linux';
};

export class Main {
  private memHandler: MemHandler;

  private windowHandler: WindowLinux | WindowWin32;

  private entitiesHandler: EntitiesHandler;

  private keyboardHandler: KeyboardLinux | KeyboardWin32;

  constructor() {
    this.memHandler = new MemHandler();

    this.windowHandler = linux() ? new WindowLinux() : new WindowWin32();

    this.entitiesHandler = new EntitiesHandler(this.windowHandler);

    this.keyboardHandler = linux()
      ? new KeyboardLinux(this.windowHandler as WindowLinux, this.entitiesHandler)
      : new KeyboardWin32(this.windowHandler as WindowWin32, this.entitiesHandler);
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

    this.entitiesHandler.run(this.memHandler.processHandle, this.memHandler.gameObjectPtrs);

    this.keyboardHandler.run();
  }
}
