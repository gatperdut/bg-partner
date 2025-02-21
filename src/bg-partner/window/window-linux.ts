import { execSync } from 'child_process';
import _ from 'lodash-es';
import { WindowCommon } from './window-common';

export class WindowLinux extends WindowCommon {
  public init(): void {
    // Empty
  }

  public run(pid: number): void {
    super.run(pid);

    const wmctrlValues: number[] = _.map(
      execSync(`wmctrl -lpG | awk '$3 == ${pid} {print $1, $4, $5, $6, $7}'`).toString().split(' '),
      (field: string, index: number): number => {
        return Number.parseInt(field, index === 0 ? 16 : 10);
      }
    );

    const windowTitleHeight: number = this.windowId
      ? wmctrlValues[2] -
        Number.parseInt(
          execSync(
            `xwininfo -id ${this.windowId} | grep "Absolute upper-left Y" | awk '{print $4}'`
          ).toString()
        )
      : 0;

    this.windowId = wmctrlValues[0];

    this.windowRect.left = wmctrlValues[1];

    this.windowRect.top = wmctrlValues[2] - windowTitleHeight;

    this.windowRect.right = this.windowRect.left + wmctrlValues[3];

    this.windowRect.bottom = this.windowRect.top + wmctrlValues[4];
  }

  public get focused(): boolean {
    return Number.parseInt(execSync('xdotool getwindowfocus').toString(), 10) === this.windowId;
  }

  public setForeground(): void {
    execSync(`xdotool windowactivate ${this.windowId}`);
  }

  public teardown(): void {
    // Empty
  }
}
