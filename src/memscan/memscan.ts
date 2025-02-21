import { VOID_PTR_TYPE } from '../koffi/primitives';
import { MemscanLinux } from './memscan-linux';
import { MemscanWin32 } from './memscan-win32';

export type TargetProcess = VOID_PTR_TYPE | number;

export type Memscan = MemscanLinux | MemscanWin32;

export abstract class MemscanOs {
  public targetProcess: TargetProcess;

  public pid: number;

  public alive: boolean = false;

  protected printed: boolean = false;

  protected offsetEntitiesNum: bigint;

  protected offsetEntities: bigint;

  public gameObjectPtrs: bigint[];
}
