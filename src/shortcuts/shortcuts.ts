import { globalShortcut } from 'electron';
import { config, handlers } from '../handlers';
import { ShortcutsLinux } from './shortcuts-linux';
import { ShortcutsWin32 } from './shortcuts-win32';

export type Shortcuts = ShortcutsLinux | ShortcutsWin32;

export abstract class ShortcutsOS {
  constructor() {
    globalShortcut.register(config().accelSheet, (): void => {
      handlers.window.focused && this.sheetToggle();
    });

    globalShortcut.register(config().accelBorderless, (): void => {
      handlers.window.focused && this.borderless();
    });
  }

  public teardown(): void {
    globalShortcut.unregisterAll();
  }

  protected sheetToggle(): void {
    // Empty
  }

  protected borderless(): void {
    // Empty
  }
}
