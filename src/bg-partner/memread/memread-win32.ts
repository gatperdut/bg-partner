import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { NUMBER } from '../koffi/defs/primitives';
import { TargetProcess } from '../mem/mem-common';
import { joinName, NumberSizesWin32 } from '../utils';
import { Wincalls } from '../wincalls';

export class MemreadWin32 {
  constructor(private wincalls: Wincalls) {
    // Empty
  }

  public memReadNumber(procHandle: TargetProcess, ptr: bigint, type: NUMBER): number {
    const bytesRead: number[] = [null];

    const value: number[] = [null];

    this.wincalls.ReadProcessMemoryNumber[type](
      procHandle as HANDLE_PTR_TYPE,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ptr,
      value,
      NumberSizesWin32[type],
      bytesRead
    );

    return value[0];
  }

  public memReadString(procHandle: TargetProcess, ptr: bigint): string {
    const result: number[] = [];

    let character: number;

    let i: number = 0;

    while ((character = this.memReadNumber(procHandle, ptr + BigInt(i), 'UINT8'))) {
      result.push(character);

      i++;
    }

    return joinName(result);
  }
}
