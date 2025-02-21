import { Memread } from '../memread/memread';

export type Derived = {
  hpMax: number;
};

export const derivedEmpty = (): Derived => {
  return {
    hpMax: null,
  };
};

export const derivedFill = (memread: Memread, basePtr: bigint, derived: Derived): void => {
  derived.hpMax = memread.memReadNumber(basePtr + BigInt(0x4), 'INT16');
};
