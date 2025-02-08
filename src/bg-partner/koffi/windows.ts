import koffi from 'koffi';
import { HANDLE_PTR_TYPE } from './defs/handles';
import { EnumWindowsCallbackProto, GetWindowThreadProcessId } from './defs/methods/windows';

export const EnumWindowsCallbackRegister = (callback: unknown) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return koffi.register(callback, koffi.pointer(EnumWindowsCallbackProto));
};

export const getWindowThreadProcessId = (windowHandle: HANDLE_PTR_TYPE): number => {
  const windowPid: number[] = [0];

  GetWindowThreadProcessId(windowHandle, windowPid);

  return windowPid[0];
};
