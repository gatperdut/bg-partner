import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';

export type TargetProcess = HANDLE_PTR_TYPE | number;

export class MemCommon {
  public targetProcess: TargetProcess;

  public pid: number;

  public alive: boolean = false;

  protected waitingPrinted: boolean = false;

  public gameObjectPtrs: bigint[];

  public init(): void {
    // Empty
  }

  public run(): void {
    // Empty
  }
}
