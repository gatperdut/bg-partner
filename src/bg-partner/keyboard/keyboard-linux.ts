import { execSync } from 'child_process';
import { globalShortcut } from 'electron';
import { EntitiesHandler } from '../entities.handler';
import { WindowLinux } from '../window/window-linux';
import { KeyboardCommon } from './keyboard-common';

export class KeyboardLinux extends KeyboardCommon {
  constructor(private windowHandler: WindowLinux, protected entitiesHandler: EntitiesHandler) {
    super(entitiesHandler);

    // MIG
    globalShortcut.register('CommandOrControl+A', () => {
      this.windowHandler.focused && this.sheetToggle();
    });

    globalShortcut.register('CommandOrControl+Q', () => {
      execSync(
        `wmctrl -i -r ${id} -e 0,0,0,${windowHandler.screenSize.width},${windowHandler.screenSize.height}`
      );
    });
  }
}
