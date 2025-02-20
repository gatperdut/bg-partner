import { NUMBER } from '../koffi/defs/primitives';

import { Linuxcalls } from '../linuxcalls';
import { TargetProcess } from '../mem/mem-common';
import { joinName } from '../utils';

export class MemreadLinux {
  constructor(private linuxcalls: Linuxcalls) {
    // Empty
  }

  public memReadNumber(pid: TargetProcess, ptr: bigint, type: NUMBER): number | bigint {
    return this.linuxcalls.readNumber(pid as number, ptr, type);

    // return Number.parseInt(
    //   execSync(
    //     `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 count=${NumberSizesLinux[type]} skip=${ptr} 2>/dev/null | od -An ${NumberFlagsLinux[type]}'`
    //   ).toString()
    // );
  }

  public memReadString(pid: TargetProcess, ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(pid, ptr + BigInt(i), 'UINT8') as number)) {
      result.push(character);

      i++;
    }

    return joinName(result);

    // return execSync(
    //   `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 skip=${ptr} 2>/dev/null | { IFS= read -r -d '' data; echo "$data"; }'`
    // ).toString();
  }
}
