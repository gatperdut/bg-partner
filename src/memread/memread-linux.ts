import { Primitive } from '../koffi/primitives';
import { handlers } from '../main';

import { SyscallsLinux } from '../syscalls/linux/syscalls-linux';
import { joinASCII } from '../utils';

export class MemreadLinux {
  private get syscalls(): SyscallsLinux {
    return handlers.syscalls as SyscallsLinux;
  }

  public memReadNumber(ptr: bigint, primitive: Primitive): number | bigint {
    return this.syscalls.readNumber(handlers.memscan.targetProcess as number, ptr, primitive);
  }

  public memReadString(ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(ptr + BigInt(i), 'UINT8') as number)) {
      result.push(character);

      i++;
    }

    return joinASCII(result);
  }
}
