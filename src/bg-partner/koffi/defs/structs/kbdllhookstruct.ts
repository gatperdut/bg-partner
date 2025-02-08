import koffi from 'koffi';
import { ULONG, ULONG_PTR } from '../primitives';

export const KBDLLHOOKSTRUCT = koffi.struct('KBDLLHOOKSTRUCT', {
  vkCode: ULONG,
  scanCode: ULONG,
  flags: ULONG,
  time: ULONG,
  dwExtraInfo: ULONG_PTR,
});

export type KBDLLHOOKSTRUCT_TYPE = typeof KBDLLHOOKSTRUCT;
