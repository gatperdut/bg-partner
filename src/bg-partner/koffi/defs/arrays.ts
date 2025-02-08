import koffi from 'koffi';
import { CHAR } from './primitives';

export const CHAR_ARRAY = (length: number) => {
  return koffi.array(CHAR, length, 'Array');
};
