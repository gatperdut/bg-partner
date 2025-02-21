import koffi from 'koffi';
import {
  PROCESS_QUERY_LIMITED_INFORMATION,
  PROCESS_VM_READ,
  STILL_ACTIVE,
  TH32CS_SNAPMODULE,
  TH32CS_SNAPPROCESS,
} from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { handlers } from '../main';
import { MODULEENTRY32_TYPE, PROCESSENTRY32_TYPE, SyscallsWin32 } from '../syscalls/syscalls-win32';
import { joinName } from '../utils';
import { MemscanCommon } from './memscan-common';

export class MemscanWin32 extends MemscanCommon {
  private processSnapshot: HANDLE_PTR_TYPE;

  private modBaseAddr: bigint;

  private get syscalls(): SyscallsWin32 {
    return handlers.syscalls as SyscallsWin32;
  }

  public init(): void {
    this.processSnapshot = this.syscalls.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);

    const processEntry32: PROCESSENTRY32_TYPE = this.syscalls.PROCESSENTRY32_empty();

    this.syscalls.Process32First(this.processSnapshot, processEntry32);

    do {
      if (joinName(processEntry32.szExeFile) === 'Baldur.exe') {
        this.pid = processEntry32.th32ProcessID;

        break;
      }
    } while (this.syscalls.Process32Next(this.processSnapshot, processEntry32));

    if (!this.pid) {
      if (!this.waitingPrinted) {
        console.log('Waiting for process...');

        this.waitingPrinted = true;
      }

      this.gameObjectPtrs = [];

      this.syscalls.CloseHandle(this.processSnapshot);

      this.syscalls.CloseHandle(this.targetProcess);

      return;
    }

    console.log('Process found, PID:', this.pid);

    this.waitingPrinted = false;

    const moduleEntry32: MODULEENTRY32_TYPE = this.syscalls.MODULEENTRY32_empty();

    const moduleSnapshot: HANDLE_PTR_TYPE = this.syscalls.CreateToolhelp32Snapshot(
      TH32CS_SNAPMODULE,
      this.pid
    );

    this.syscalls.Module32First(moduleSnapshot, moduleEntry32);

    do {
      if (joinName(moduleEntry32.szModule) === 'Baldur.exe') {
        break;
      }
    } while (this.syscalls.Module32Next(this.processSnapshot, moduleEntry32));

    this.modBaseAddr = koffi.address(moduleEntry32.modBaseAddr);

    this.targetProcess = this.syscalls.OpenProcess(
      PROCESS_VM_READ | PROCESS_QUERY_LIMITED_INFORMATION,
      true,
      this.pid
    );

    this.syscalls.CloseHandle(moduleSnapshot);
  }

  protected isProcessAlive(): boolean {
    const result: number[] = [0];

    this.syscalls.GetExitCodeProcess(this.targetProcess, result);

    return result[0] === STILL_ACTIVE;
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = this.isProcessAlive();

    if (!this.alive) {
      this.pid = null;

      this.syscalls.CloseHandle(this.processSnapshot);

      this.processSnapshot = null;

      this.syscalls.CloseHandle(this.targetProcess);

      this.targetProcess = null;

      return;
    }

    const offset: number = 0x68d434;

    const numEntities: number = handlers.memread.memReadNumber(
      this.modBaseAddr + BigInt(offset),
      'INT32'
    ) as number;

    const listPointer: bigint = this.modBaseAddr + BigInt(offset + 0x4 + 0x18);

    for (let i: number = 2000 * 16; i <= numEntities * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(
        BigInt(handlers.memread.memReadNumber(listPointer + BigInt(i + 8), 'PTR'))
      );
    }
  }
}
