import koffi from 'koffi';
import {
  PROCESS_QUERY_LIMITED_INFORMATION,
  PROCESS_VM_READ,
  STILL_ACTIVE,
  TH32CS_SNAPMODULE,
  TH32CS_SNAPPROCESS,
} from '../koffi/constants';
import { HANDLE_PTR_TYPE } from '../koffi/handles';
import { handlers } from '../main';
import { MODULEENTRY32_TYPE, PROCESSENTRY32_TYPE } from '../syscalls/win32/libs/syscalls-kernel32';
import { SyscallsWin32 } from '../syscalls/win32/syscalls-win32';
import { joinName } from '../utils';
import { MemscanOs } from './memscan';

export class MemscanWin32 extends MemscanOs {
  constructor() {
    super();

    this.offsetEntitiesNum = BigInt(0x68d434);

    this.offsetEntities = this.offsetEntitiesNum + BigInt(0x4 + 0x18);
  }

  private processSnapshot: HANDLE_PTR_TYPE;

  private modBaseAddr: bigint;

  private get syscalls(): SyscallsWin32 {
    return handlers.syscalls as SyscallsWin32;
  }

  public init(): void {
    this.processSnapshot = this.syscalls.syscallsKernel32.CreateToolhelp32Snapshot(
      TH32CS_SNAPPROCESS,
      0
    );

    const processEntry32: PROCESSENTRY32_TYPE =
      this.syscalls.syscallsKernel32.PROCESSENTRY32_empty();

    this.syscalls.syscallsKernel32.Process32First(this.processSnapshot, processEntry32);

    do {
      if (joinName(processEntry32.szExeFile) === 'Baldur.exe') {
        this.pid = processEntry32.th32ProcessID;

        break;
      }
    } while (this.syscalls.syscallsKernel32.Process32Next(this.processSnapshot, processEntry32));

    if (!this.pid) {
      if (!this.printed) {
        console.log('Waiting for process...');

        this.printed = true;
      }

      this.gameObjectPtrs = [];

      this.syscalls.syscallsKernel32.CloseHandle(this.processSnapshot);

      this.syscalls.syscallsKernel32.CloseHandle(this.targetProcess);

      return;
    }

    console.log('Process found, PID:', this.pid);

    this.printed = false;

    const moduleEntry32: MODULEENTRY32_TYPE = this.syscalls.syscallsKernel32.MODULEENTRY32_empty();

    const moduleSnapshot: HANDLE_PTR_TYPE = this.syscalls.syscallsKernel32.CreateToolhelp32Snapshot(
      TH32CS_SNAPMODULE,
      this.pid
    );

    this.syscalls.syscallsKernel32.Module32First(moduleSnapshot, moduleEntry32);

    do {
      if (joinName(moduleEntry32.szModule) === 'Baldur.exe') {
        break;
      }
    } while (this.syscalls.syscallsKernel32.Module32Next(this.processSnapshot, moduleEntry32));

    this.modBaseAddr = koffi.address(moduleEntry32.modBaseAddr);

    this.targetProcess = this.syscalls.syscallsKernel32.OpenProcess(
      PROCESS_VM_READ | PROCESS_QUERY_LIMITED_INFORMATION,
      true,
      this.pid
    );

    this.syscalls.syscallsKernel32.CloseHandle(moduleSnapshot);
  }

  private get aliveGet(): boolean {
    const result: number[] = [0];

    this.syscalls.syscallsKernel32.GetExitCodeProcess(this.targetProcess, result);

    return result[0] === STILL_ACTIVE;
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = this.aliveGet;

    if (!this.alive) {
      this.pid = null;

      this.syscalls.syscallsKernel32.CloseHandle(this.processSnapshot);

      this.processSnapshot = null;

      this.syscalls.syscallsKernel32.CloseHandle(this.targetProcess);

      this.targetProcess = null;

      return;
    }

    const entitiesNum: number = handlers.memread.memReadNumber(
      this.modBaseAddr + BigInt(this.offsetEntitiesNum),
      'INT32'
    ) as number;

    for (let i: number = 2001 * 16; i <= entitiesNum * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(
        BigInt(
          handlers.memread.memReadNumber(
            this.modBaseAddr + this.offsetEntities + BigInt(i + 8),
            'PTR'
          )
        )
      );
    }
  }
}
