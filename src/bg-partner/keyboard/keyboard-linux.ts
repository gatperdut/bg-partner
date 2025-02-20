import { execSync } from 'child_process';
import { globalShortcut } from 'electron';
import { Entities } from '../entities';
import { WindowLinux } from '../window/window-linux';
import { KeyboardCommon } from './keyboard-common';

export class KeyboardLinux extends KeyboardCommon {
  constructor(private windowHandler: WindowLinux, protected entitiesHandler: Entities) {
    super(entitiesHandler);

    globalShortcut.register('CommandOrControl+A', () => {
      this.windowHandler.focused && this.sheetToggle();
    });

    globalShortcut.register('CommandOrControl+Q', () => {
      execSync(
        `wmctrl -i -r ${windowHandler.windowId} -e 0,0,0,${windowHandler.screenSize.width},${windowHandler.screenSize.height}`
      );
    });
  }

  protected sheetToggle(): void {
    const parts: string[] = execSync('xdotool getmouselocation').toString().split(' ');

    const partsX = parts[0].split(':');

    const partsY = parts[1].split(':');

    const point: Electron.Point = {
      x: Number.parseInt(partsX[1], 10),
      y: Number.parseInt(partsY[1], 10),
    };

    this.entitiesHandler.sheetToggle(point);
  }

  public run(): void {
    // Empty
  }
}
