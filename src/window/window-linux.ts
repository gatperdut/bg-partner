import { execSync } from 'child_process';
import _ from 'lodash-es';
import { handlers } from '../main';
import { WindowOs } from './window';

export class WindowLinux extends WindowOs {
  public init(): void {
    // Empty
  }

  public run(): void {
    super.run();

    const wmctrlValues: number[] = _.map(
      execSync(`wmctrl -lpG | awk '$3 == ${handlers.memscan.pid} {print $1, $4, $5, $6, $7}'`)
        .toString()
        .split(' '),
      (field: string, index: number): number => {
        return Number.parseInt(field, index === 0 ? 16 : 10);
      }
    );

    const windowTitleHeight: number = this.id
      ? wmctrlValues[2] -
        Number.parseInt(
          execSync(
            `xwininfo -id ${this.id} | grep "Absolute upper-left Y" | awk '{print $4}'`
          ).toString()
        )
      : 0;

    this.id = wmctrlValues[0];

    this.windowRect.left = wmctrlValues[1];

    this.windowRect.top = wmctrlValues[2] - windowTitleHeight;

    this.windowRect.right = this.windowRect.left + wmctrlValues[3];

    this.windowRect.bottom = this.windowRect.top + wmctrlValues[4];
  }

  public get focused(): boolean {
    return Number.parseInt(execSync('xdotool getwindowfocus').toString(), 10) === this.id;
  }

  public setForeground(): void {
    execSync(`xdotool windowactivate ${this.id}`);
  }

  public teardown(): void {
    // Empty
  }
}
