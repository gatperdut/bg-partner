import { execSync } from 'child_process';
import { HANDLE_PTR_TYPE } from './koffi/defs/handles';
import { ReadProcessMemoryNumber, ReadProcessMemoryNumberSize } from './koffi/defs/methods/memory';
import { NUMBER } from './koffi/defs/primitives';
import { linux } from './main';
import { TargetProcess } from './mem/mem-common';
import { joinName } from './utils';

export const memReadString = (target: TargetProcess, ptr: bigint): string => {
  return linux()
    ? memReadStringLinux(target as number, ptr)
    : memReadStringWin32(target as HANDLE_PTR_TYPE, ptr);
};

const memReadStringWin32 = (procHandle: HANDLE_PTR_TYPE, ptr: bigint): string => {
  const result: number[] = [];

  let character: number;

  let i: number = 0;

  while ((character = memReadNumberWin32(procHandle, ptr + BigInt(i), 'UINT8'))) {
    result.push(character);

    i++;
  }

  return joinName(result);
};

export const memReadStringLinux = (pid: number, ptr: bigint): string => {
  return execSync(
    `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 count=2 skip=$((${ptr})) 2>/dev/null | od -An -td2'`
  ).toString();
};

export const memReadNumber = (target: TargetProcess, ptr: bigint, type: NUMBER): number => {
  return linux()
    ? memReadNumberLinux(target as number, ptr, type)
    : memReadNumberWin32(target as HANDLE_PTR_TYPE, ptr, type);
};

export const memReadNumberLinux = (pid: number, ptr: bigint, type: NUMBER): number => {
  return Number.parseInt(
    execSync(
      `sudo bash -c 'dd if=/proc/${pid}/mem bs=1 count=2 skip=$((${ptr})) 2>/dev/null | od -An -td2'`
    ).toString()
  );
};

const memReadNumberWin32 = (procHandle: HANDLE_PTR_TYPE, ptr: bigint, type: NUMBER): number => {
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
