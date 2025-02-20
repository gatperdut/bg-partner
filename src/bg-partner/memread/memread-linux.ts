import { NUMBER } from '../koffi/defs/primitives';

import { execSync } from 'child_process';
import { TargetProcess } from '../mem/mem-common';
import { joinName, NumberFlagsLinux, NumberSizesLinux } from '../utils';

export class MemreadLinux {
  public memReadNumber(pid: TargetProcess, ptr: bigint, type: NUMBER): number {
    return Number.parseInt(
      execSync(
        `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 count=${NumberSizesLinux[type]} skip=${ptr} 2>/dev/null | od -An ${NumberFlagsLinux[type]}'`
      ).toString()
    );
  }

  public memReadString(pid: TargetProcess, ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(pid, ptr + BigInt(i), 'UINT8'))) {
      result.push(character);

      i++;
    }

    return joinName(result);

    // return execSync(
    //   `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 skip=${ptr} 2>/dev/null | { IFS= read -r -d '' data; echo "$data"; }'`
    // ).toString();
  }
}
