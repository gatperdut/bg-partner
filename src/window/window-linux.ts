import { execSync } from 'child_process';
import _ from 'lodash-es';
import { devnull } from '../const/const-linux';
import { handlers } from '../handlers';
import { WindowOs } from './window';

export class WindowLinux extends WindowOs {
  public init(): void {
    // Empty
  }

  public run(): void {
    let wmctrlValues: number[];

    try {
      wmctrlValues = _.map(
        execSync(
          `wmctrl -lpG | awk '$3 == ${handlers.memscan.pid} {print $1, $4, $5, $6, $7}' ${devnull}`
        )
          .toString()
          .split(' '),
        (field: string, index: number): number => {
          return Number.parseInt(field, index === 0 ? 16 : 10);
        }
      );
    } catch (err) {
      return;
    }

    let windowTitleHeight: number;

    try {
      windowTitleHeight = this.id
        ? wmctrlValues[2] -
          Number.parseInt(
            execSync(
              `xwininfo -id ${this.id} | grep "Absolute upper-left Y" | awk '{print $4}' ${devnull}`
            ).toString()
          )
        : 0;
    } catch (err) {
      return;
    }

    this.id = wmctrlValues[0];

    this.window.x = wmctrlValues[1];

    this.window.y = wmctrlValues[2] - windowTitleHeight;

    this.window.width = wmctrlValues[3];

    this.window.height = wmctrlValues[4];
  }

  public get focused(): boolean {
    try {
      return (
        Number.parseInt(execSync(`xdotool getwindowfocus ${devnull}`).toString(), 10) === this.id
      );
    } catch (err) {
      return false;
    }
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
