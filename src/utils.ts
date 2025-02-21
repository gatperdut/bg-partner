import { NUMBER } from './koffi/primitives';

export const joinASCII = (nums: number[]): string => {
  const result: string[] = [];

  let i = 0;

  while (i < nums.length && nums[i]) {
    result.push(String.fromCharCode(nums[i]));

    i++;
  }

  return result.join('');
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
