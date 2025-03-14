import { syscallsWin32 } from '@handlers';
import { Primitive } from '@syscalls/primitives';
import { joinASCII } from '@utils';

export class MemreadWin32 {
  public memReadNumber(ptr: bigint, primitive: Exclude<Primitive, 'ADDR'>): number {
    return syscallsWin32().helpers.memReadNumber(ptr, primitive) as number;
  }

  public memReadBigint(ptr: bigint, primitive: Extract<Primitive, 'ADDR'>): bigint {
    return syscallsWin32().helpers.memReadNumber(ptr, primitive) as bigint;
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
