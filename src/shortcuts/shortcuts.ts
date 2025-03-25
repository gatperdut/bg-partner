import { config, handlers } from '@handlers';
import { ShortcutsLinux } from '@shortcuts/shortcuts-linux';
import { ShortcutsWin32 } from '@shortcuts/shortcuts-win32';
import { globalShortcut } from 'electron';

export type Shortcuts = ShortcutsLinux | ShortcutsWin32;

export abstract class ShortcutsOS {
  constructor() {
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

    globalShortcut.register(config().obj.accelCloseAll, this.accelCloseAll);
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

  private accelCloseAll(): void {
    handlers.entities.sheetCloseAll();
  }
}
