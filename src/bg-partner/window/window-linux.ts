import { execSync } from 'child_process';
import _ from 'lodash-es';
import { WindowCommon } from './window-common';

export class WindowLinux extends WindowCommon {
  public windowId: number;

  constructor() {
    super();
  }

  public init(): void {
    // Empty
  }

  public run(pid: number): void {
    super.run(pid);

    const values: number[] = _.map(
      execSync(`wmctrl -lpG | awk '$3 == ${pid} {print $1, $4, $5, $6, $7}'`).toString().split(' '),
      (field: string, index: number): number => {
        return Number.parseInt(field, index === 0 ? 16 : 10);
      }
    );

    this.windowId = values[0];

    this.windowRect.left = values[1];

    this.windowRect.top = values[2];

    this.windowRect.right = this.screenSize.width - this.windowRect.left - values[3];

    this.windowRect.bottom = this.screenSize.height - this.windowRect.top - values[4];
  }

  public get focused(): boolean {
    return Number.parseInt(execSync('xdotool getwindowfocus').toString(), 10) === this.windowId;
  }

  public setForeground(): void {
    execSync('xdotool windowactivate ${this.windowId}');
  }

  public teardown(): void {
    // Empty
  }
}
