import { HANDLE_PTR_TYPE } from '../koffi/handles';
import { NUMBER } from '../koffi/primitives';
import { handlers } from '../main';
import { SyscallsWin32 } from '../syscalls/win32/syscalls-win32';
import { joinName, NumberSizesWin32 } from '../utils';

export class MemreadWin32 {
  private get syscalls(): SyscallsWin32 {
    return handlers.syscalls as SyscallsWin32;
  }

  public memReadNumber(ptr: bigint, type: NUMBER): number | bigint {
    const bytesRead: number[] = [null];

    const value: number[] = [null];

    this.syscalls.syscallsKernel32.ReadProcessMemoryNumber[type](
      handlers.memscan.targetProcess as HANDLE_PTR_TYPE,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ptr,
      value,
      NumberSizesWin32[type],
      bytesRead
    );

    return type === 'PTR' ? BigInt(value[0]) : value[0];
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
