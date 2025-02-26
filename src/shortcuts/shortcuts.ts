import { globalShortcut } from 'electron';
import { config, handlers } from '../handlers';
import { ShortcutsLinux } from './shortcuts-linux';
import { ShortcutsWin32 } from './shortcuts-win32';

export type Shortcuts = ShortcutsLinux | ShortcutsWin32;

export abstract class ShortcutsOS {
  constructor() {
    // TODO remove when window.ts early return is removed.
    this.register();
    // Empty
  }

  private accelSheet: () => void = (): void => {
    handlers.window.focusedLast && this.sheetToggle();
  };

  private accelBorderless: () => void = (): void => {
    handlers.window.focusedLast && this.borderless();
  };

  private register(): void {
    globalShortcut.register(config().obj.accelSheet, this.accelSheet);

    globalShortcut.register(config().obj.accelBorderless, this.accelBorderless);
  }

  private unregister(): void {
    globalShortcut.unregisterAll();
  }

  public teardown(): void {
    this.unregister();
  }

  public focusChanged(focused: boolean): void {
    focused ? this.register() : this.unregister();
  }

  protected sheetToggle(): void {
    // Empty
  }

  protected borderless(): void {
    // Empty
  }
}
