import { NUMBER } from '../koffi/defs/primitives';

import { execSync } from 'child_process';
import { TargetProcess } from '../mem/mem-common';

export class MemreadLinux {
  public memReadNumber(pid: TargetProcess, ptr: bigint, type: NUMBER): number {
    return Number.parseInt(
      execSync(
        `sudo bash -c 'dd if=/proc/${
          pid as number
        }/mem bs=1 count=2 skip=$((${ptr})) 2>/dev/null | od -An -td2'`
      ).toString()
    );
  }

  public memReadString(pid: TargetProcess, ptr: bigint): string {
    return execSync(
      `sudo bash -c 'dd if=/proc/${
        pid as number
      }/mem bs=1 count=2 skip=$((${ptr})) 2>/dev/null | od -An -td2'`
    ).toString();
  }
}
