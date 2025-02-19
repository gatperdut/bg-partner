import { NUMBER } from './koffi/defs/primitives';

export const joinName = (nums: number[]): string => {
  const result: string[] = [];

  let i = 0;

  while (i < nums.length && nums[i]) {
    result.push(String.fromCharCode(nums[i]));

    i++;
  }

  return result.join('');
};

export const blankArray = (length: number): number[] => {
  return new Array(length).fill(0);
};

export const NumberSizesWin32: Record<NUMBER, number> = {
  BOOL: 1,
  BYTE: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  UINT32: 4,
  INT32: 4,
  DWORD: 4,
  LONG: 4,
  ULONG: 4,
  PTR: 4,
};

export const NumberSizesLinux: Record<NUMBER, number> = {
  BOOL: 1,
  BYTE: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  UINT32: 4,
  INT32: 4,
  DWORD: 4,
  LONG: 4,
  ULONG: 4,
  PTR: 8,
};

export const NumberFlagsLinux: Record<NUMBER, string> = {
  BOOL: '-td1',
  BYTE: '-td1',
  UINT8: '-tu1',
  INT16: '-td2',
  UINT16: '-tu2',
  UINT32: '-tu4',
  INT32: '-td4',
  DWORD: '-td4',
  LONG: '-td4',
  ULONG: '-tu4',
  PTR: '-td8',
};
