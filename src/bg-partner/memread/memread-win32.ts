import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { NUMBER } from '../koffi/defs/primitives';
import { handlers } from '../main';
import { TargetProcess } from '../memscan/memscan-common';
import { joinName, NumberSizesWin32 } from '../utils';

export class MemreadWin32 {
  public memReadNumber(procHandle: TargetProcess, ptr: bigint, type: NUMBER): number | bigint {
    const bytesRead: number[] = [null];

    const value: number[] = [null];

    handlers.wincalls.ReadProcessMemoryNumber[type](
      procHandle as HANDLE_PTR_TYPE,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ptr,
      value,
      NumberSizesWin32[type],
      bytesRead
    );

    return type === 'PTR' ? BigInt(value[0]) : value[0];
  }

  public memReadString(procHandle: TargetProcess, ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(procHandle, ptr + BigInt(i), 'UINT8') as number)) {
      result.push(character);

      i++;
    }

    return joinName(result);
  }
}
