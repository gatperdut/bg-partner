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
