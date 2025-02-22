import { handlers } from '../main';
import { Primitive } from '../syscalls/primitives';
import { SyscallsWin32 } from '../syscalls/win32/syscalls-win32';
import { joinASCII } from '../utils';

export class MemreadWin32 {
  private get syscalls(): SyscallsWin32 {
    return handlers.syscalls as SyscallsWin32;
  }

  public memReadNumber(ptr: bigint, primitive: Exclude<Primitive, 'ADDR'>): number {
    return this.syscalls.helpersWin32.memReadNumber(ptr, primitive) as number;
  }

  public memReadBigint(ptr: bigint, primitive: Extract<Primitive, 'ADDR'>): bigint {
    return this.syscalls.helpersWin32.memReadNumber(ptr, primitive) as bigint;
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
