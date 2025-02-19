import { TargetProcess } from '../mem/mem-common';
import { memReadNumber } from '../memread';

export type Derived = {
  hpMax: number;
};

export const derivedEmpty = (): Derived => {
  return {
    hpMax: null,
  };
};

export const derivedFill = (procHandle: TargetProcess, basePtr: number, derived: Derived): void => {
  derived.hpMax = memReadNumber(procHandle, BigInt(basePtr + 0x4), 'INT16');
};
