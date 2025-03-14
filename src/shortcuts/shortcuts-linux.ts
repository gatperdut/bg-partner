import { devnull } from '@const/const-linux';
import { handlers } from '@handlers';
import { ShortcutsOS } from '@shortcuts/shortcuts';
import { execSync } from 'child_process';

export class ShortcutsLinux extends ShortcutsOS {
  constructor() {
    super();
  }

  protected sheetToggle(): void {
    const parts: string[] = execSync(`xdotool getmouselocation ${devnull}`).toString().split(' ');

    const partsX = parts[0].split(':');

    const partsY = parts[1].split(':');

    const point: Electron.Point = {
      x: Number.parseInt(partsX[1], 10),
      y: Number.parseInt(partsY[1], 10),
    };

    handlers.entities.sheetToggle(point);
  }

  protected borderless(): void {
    execSync(
      `wmctrl -i -r ${handlers.window.id} -e 0,${handlers.window.display.x},${handlers.window.display.y},${handlers.window.display.width},${handlers.window.display.height}`
    );
  }
}
