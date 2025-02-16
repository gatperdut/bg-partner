import 'source-map-support/register';
import { EntitiesHandler } from './entities.handler';
import { KeyboardHandler } from './keyboard.handler';
import { MemHandler } from './mem.handler';
import { WindowHandler } from './window.handler';

export class Main {
  private memHandler: MemHandler;

  private windowHandler: WindowHandler;

  private entitiesHandler: EntitiesHandler;

  private keyboardHandler: KeyboardHandler;

  constructor() {
    this.memHandler = new MemHandler();

    this.windowHandler = new WindowHandler();

    this.entitiesHandler = new EntitiesHandler(this.windowHandler);

    this.keyboardHandler = new KeyboardHandler(this.windowHandler, this.entitiesHandler);
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

    this.windowHandler.run();

    this.entitiesHandler.run(this.memHandler.processHandle, this.memHandler.gameObjectPtrs);

    this.keyboardHandler.run();
  }
}
