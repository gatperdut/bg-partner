import { MemscanLinux } from '@memscan/memscan-linux';
import { MemscanWin32 } from '@memscan/memscan-win32';
import { VOIDPTR } from '@syscalls/primitives';

export type TargetProcess = VOIDPTR | number;

export type Memscan = MemscanLinux | MemscanWin32;

export abstract class MemscanOs {
  public pid: number;

  public alive: boolean = false;

  protected printed: boolean = false;

  protected offsetEntitiesNum: bigint;

  protected offsetEntities: bigint;

  public gameObjectPtrs: bigint[];
}
