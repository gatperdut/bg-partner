import koffi from 'koffi';
import { UINT32 } from '../primitives';

export const RECT = koffi.struct('RECT', {
  left: UINT32,
  top: UINT32,
  right: UINT32,
  bottom: UINT32,
});

export const RECT_PTR = koffi.pointer(RECT);
