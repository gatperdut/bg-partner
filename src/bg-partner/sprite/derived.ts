import { TargetProcess } from '../mem/mem-common';
import { Memread } from '../memread/memread';

export type Derived = {
  hpMax: number;
};

export const derivedEmpty = (): Derived => {
  return {
    hpMax: null,
  };
};

export const derivedFill = (
  memread: Memread,
  targetProcess: TargetProcess,
  basePtr: number,
  derived: Derived
): void => {
  derived.hpMax = memread.memReadNumber(targetProcess, BigInt(basePtr + 0x4), 'INT16');
};
