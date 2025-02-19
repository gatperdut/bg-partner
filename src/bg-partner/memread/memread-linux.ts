import { NUMBER } from '../koffi/defs/primitives';

import { execSync } from 'child_process';
import { TargetProcess } from '../mem/mem-common';
import { NumberFlagsLinux, NumberSizesLinux } from '../utils';

export class MemreadLinux {
  public memReadNumber(pid: TargetProcess, ptr: bigint, type: NUMBER): number {
    return Number.parseInt(
      execSync(
        `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 count=${NumberSizesLinux[type]} skip=${ptr} 2>/dev/null | od -An ${NumberFlagsLinux[type]}'`
      ).toString()
    );
  }

  public memReadString(pid: TargetProcess, ptr: bigint): string {
    return execSync(
      `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 skip=${ptr} 2>/dev/null | { IFS= read -r -d '' data; echo "$data"; }'`
    ).toString();
  }
}
