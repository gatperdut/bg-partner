import { STILL_ACTIVE } from './defs/constants';
import { HANDLE_PTR_TYPE } from './defs/handles';
import { GetExitCodeProcess } from './defs/methods/system';

export const isProcessAlive = (handle: HANDLE_PTR_TYPE): boolean => {
  const result: number[] = [0];

  GetExitCodeProcess(handle, result);

  return result[0] === STILL_ACTIVE;
};
