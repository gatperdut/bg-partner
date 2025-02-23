import { globalShortcut } from 'electron';
import { ShortcutsLinux } from './shortcuts-linux';
import { ShortcutsWin32 } from './shortcuts-win32';

export type Shortcuts = ShortcutsLinux | ShortcutsWin32;

export abstract class ShortcutsOS {
  public teardown(): void {
    console.log('UNREGIS');
    globalShortcut.unregisterAll();
  }
}
