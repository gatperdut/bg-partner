import { execSync } from 'child_process';
import { globalShortcut } from 'electron';
import { handlers } from '../main';

export class ShortcutsLinux {
  constructor() {
    globalShortcut.register('CommandOrControl+A', (): void => {
      handlers.window.focused && this.sheetToggle();
    });

    globalShortcut.register('CommandOrControl+Q', (): void => {
      handlers.window.focused && this.borderless();
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

    handlers.entities.sheetToggle(point);
  }

  private borderless(): void {
    execSync(
      `wmctrl -i -r ${handlers.window.windowId} -e 0,0,0,${handlers.window.screenSize.width},${handlers.window.screenSize.height}`
    );
  }
}
