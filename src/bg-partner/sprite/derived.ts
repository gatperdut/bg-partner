import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { memReadNumber } from '../koffi/memread';

export type Derived = {
  hpMax: number;
};

export const derivedEmpty = (): Derived => {
  return {
    hpMax: null,
  };
};

export const derivedFill = (
  procHandle: HANDLE_PTR_TYPE,
  basePtr: number,
  derived: Derived
): void => {
  derived.hpMax = memReadNumber(procHandle, BigInt(basePtr + 0x4), 'INT16');
};
