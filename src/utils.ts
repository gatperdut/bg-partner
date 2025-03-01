export const joinASCII = (codes: number[]): string => {
  const result: string[] = [];

  let i: number = 0;

  while (i < codes.length && codes[i]) {
    result.push(String.fromCharCode(codes[i]));

    i++;
  }

  return result.join('');
};

export const readBufferString = (buffer: Buffer, base: number, length: number): string => {
  const result: number[] = [];

  let code: number;
  for (let i: number = 0; i < length; i++) {
    code = buffer.readUInt8(base + i);

    if (!code) {
      break;
    }

    result.push(code);
  }

  return joinASCII(result);
};
