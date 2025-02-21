import { NUMBER } from '../koffi/defs/primitives';

import { handlers } from '../main';
import { SyscallsLinux } from '../syscalls/syscalls-linux';
import { joinName } from '../utils';

export class MemreadLinux {
  private get syscalls(): SyscallsLinux {
    return handlers.syscalls as SyscallsLinux;
  }

  public memReadNumber(ptr: bigint, type: NUMBER): number | bigint {
    return this.syscalls.readNumber(handlers.memscan.targetProcess as number, ptr, type);
  }

  public memReadString(ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(ptr + BigInt(i), 'UINT8') as number)) {
      result.push(character);

      i++;
    }

    return joinName(result);
  }
}
