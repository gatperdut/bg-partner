import { joinName } from '../utils';
import { HANDLE_PTR_TYPE } from './defs/handles';
import { ReadProcessMemoryNumber, ReadProcessMemoryNumberSize } from './defs/methods/memory';
import { NUMBER } from './defs/primitives';

export const memReadString = (procHandle: HANDLE_PTR_TYPE, ptr: bigint): string => {
  const result: number[] = [];

  let character: number;

  let i: number = 0;

  while ((character = memReadNumber(procHandle, ptr + BigInt(i), 'UINT8'))) {
    result.push(character);

    i++;
  }

  return joinName(result);
};

export const memReadNumber = (procHandle: HANDLE_PTR_TYPE, ptr: bigint, type: NUMBER): number => {
  const bytesRead: number[] = [null];

  const value: number[] = [null];

  ReadProcessMemoryNumber[type](
    procHandle,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ptr,
    value,
    ReadProcessMemoryNumberSize[type],
    bytesRead
  );

  return value[0];
};
