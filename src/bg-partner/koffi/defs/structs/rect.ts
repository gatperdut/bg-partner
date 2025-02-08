import koffi from 'koffi';
import { UINT32 } from '../primitives';

export const RECT = koffi.struct('RECT', {
  left: UINT32,
  top: UINT32,
  right: UINT32,
  bottom: UINT32,
});

export const RECT_PTR = koffi.pointer(RECT);

export type RECT_TYPE = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export const RECT_empty = (): RECT_TYPE => {
  return {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  };
};
