export const joinASCII = (codes: number[]): string => {
  const result: string[] = [];

  let i: number = 0;

  while (i < codes.length && codes[i]) {
    result.push(String.fromCharCode(codes[i]));

    i++;
  }

  return result.join('');
};
