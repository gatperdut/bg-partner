import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';

export type TargetProcess = HANDLE_PTR_TYPE | number;

export class MemscanCommon {
  public targetProcess: TargetProcess;

  public pid: number;

  public alive: boolean = false;

  protected waitingPrinted: boolean = false;

  public gameObjectPtrs: bigint[];
}
