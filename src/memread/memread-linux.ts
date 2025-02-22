import { handlers } from '../main';
import { Primitive } from '../syscalls/primitives';

import { SyscallsLinux } from '../syscalls/linux/syscalls-linux';
import { joinASCII } from '../utils';

export class MemreadLinux {
  private get syscalls(): SyscallsLinux {
    return handlers.syscalls as SyscallsLinux;
  }

  public memReadNumber(ptr: bigint, primitive: Exclude<Primitive, 'ADDR'>): number {
    return this.syscalls.helpersLinux.readNumber(handlers.memscan.pid, ptr, primitive) as number;
  }

  public memReadBigint(ptr: bigint, primitive: Extract<Primitive, 'ADDR'>): bigint {
    return this.syscalls.helpersLinux.readNumber(handlers.memscan.pid, ptr, primitive) as bigint;
  }

  public memReadString(ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(ptr + BigInt(i), 'UINT8'))) {
      result.push(character);

      i++;
    }

    return joinASCII(result);
  }
}
