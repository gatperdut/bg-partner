import { execSync } from 'child_process';
import { globalShortcut } from 'electron';
import { Entities } from '../entities';
import { WindowLinux } from '../window/window-linux';

export class KeyboardLinux {
  constructor(private windowHandler: WindowLinux, private entitiesHandler: Entities) {
    globalShortcut.register('CommandOrControl+A', (): void => {
      this.windowHandler.focused && this.sheetToggle();
    });

    globalShortcut.register('CommandOrControl+Q', (): void => {
      this.windowHandler.focused && this.borderless();
    });
  }

  private sheetToggle(): void {
    const parts: string[] = execSync('xdotool getmouselocation').toString().split(' ');

    const partsX = parts[0].split(':');

    const partsY = parts[1].split(':');

    const point: Electron.Point = {
      x: Number.parseInt(partsX[1], 10),
      y: Number.parseInt(partsY[1], 10),
    };

    this.entitiesHandler.sheetToggle(point);
  }

  private borderless(): void {
    execSync(
      `wmctrl -i -r ${this.windowHandler.windowId} -e 0,0,0,${this.windowHandler.screenSize.width},${this.windowHandler.screenSize.height}`
    );
  }
}
