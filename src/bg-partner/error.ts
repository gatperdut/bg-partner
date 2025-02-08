import { GetLastError } from './koffi/defs/methods/error';

export const checkError = (): number => {
  const error = GetLastError();

  return error;
};
