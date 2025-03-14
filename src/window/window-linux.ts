import { devnull } from '@const/const-linux';
import { handlers } from '@handlers';
import { WindowOs } from '@window/window';
import { execSync } from 'child_process';
import _ from 'lodash';

export class WindowLinux extends WindowOs {
  public init(): void {
    // Empty
  }

  public run(): void {
    let wmctrlValues: number[];

    try {
      wmctrlValues = _.map(
        execSync(
          `wmctrl -lpG | awk '$3 == ${handlers.memscan.pid} {print $1, $4, $5, $6, $7}' ${devnull}`,
        )
          .toString()
          .split(' '),
        (field: string, index: number): number => {
          return Number.parseInt(field, index === 0 ? 16 : 10);
        },
      );
    } catch (err) {
      return;
    }

    let windowOffset: Electron.Point;

    if (this.id) {
      windowOffset = this.windowOffsetGet(wmctrlValues);

      if (!windowOffset) {
        return;
      }
    } else {
      windowOffset = { x: 0, y: 0 };
    }

    this.id = wmctrlValues[0];

    this.window.x = wmctrlValues[1] - windowOffset.x;

    this.window.y = wmctrlValues[2] - windowOffset.y;

    this.window.width = wmctrlValues[3];

    this.window.height = wmctrlValues[4];

    this.focusedUpdate();
  }

  private windowOffsetGet(wmctrlValues: number[]): Electron.Point {
    const result: Electron.Point = { x: 0, y: 0 };

    try {
      // const xwininfo: string = execSync(`xwininfo -id ${this.id}`).toString();

      result.x = this.id
        ? Number.parseInt(
            execSync(
              `xwininfo -id ${this.id} | grep "Relative upper-left X" | awk '{print $4}' ${devnull}`,
            ).toString(),
            10,
          )
        : 0;

      result.y = this.id
        ? wmctrlValues[2] -
          Number.parseInt(
            execSync(
              `xwininfo -id ${this.id} | grep "Absolute upper-left Y" | awk '{print $4}' ${devnull}`,
            ).toString(),
            10,
          )
        : 0;
    } catch (err) {
      return null;
    }

    return result;
  }

  private get focused(): boolean {
    try {
      return (
        Number.parseInt(execSync(`xdotool getwindowfocus ${devnull}`).toString(), 10) === this.id
      );
    } catch (err) {
      return false;
    }
  }

  protected focusedUpdate(): void {
    const focused: boolean = this.focused;

    if (this.focusedLast !== focused) {
      this.focusChanged(focused);
    }

    this.focusedLast = focused;
  }

  public setForeground(): void {
    try {
      execSync(`xdotool windowfocus ${this.id} ${devnull}`);
    } catch (err) {
      return;
    }
  }

  public teardown(): void {
    // Empty
  }
}
