import koffi from 'koffi';
import {
  PROCESS_QUERY_LIMITED_INFORMATION,
  PROCESS_VM_READ,
  STILL_ACTIVE,
  TH32CS_SNAPMODULE,
  TH32CS_SNAPPROCESS,
} from '../koffi/defs/constants';
import { HANDLE_PTR_TYPE } from '../koffi/defs/handles';
import { Memread } from '../memread/memread';
import { joinName } from '../utils';
import { MODULEENTRY32_TYPE, PROCESSENTRY32_TYPE, Wincalls } from '../wincalls';
import { MemCommon } from './mem-common';

export class MemWin32 extends MemCommon {
  private processSnapshot: HANDLE_PTR_TYPE;

  public modBaseAddr: bigint;

  constructor(private wincalls: Wincalls, private memread: Memread) {
    super();
  }

  public init(): void {
    this.processSnapshot = this.wincalls.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);

    const processEntry32: PROCESSENTRY32_TYPE = this.wincalls.PROCESSENTRY32_empty();

    this.wincalls.Process32First(this.processSnapshot, processEntry32);

    do {
      if (joinName(processEntry32.szExeFile) === 'Baldur.exe') {
        this.pid = processEntry32.th32ProcessID;

        break;
      }
    } while (this.wincalls.Process32Next(this.processSnapshot, processEntry32));

    if (!this.pid) {
      if (!this.waitingPrinted) {
        console.log('Waiting for process...');

        this.waitingPrinted = true;
      }

      this.gameObjectPtrs = [];

      this.wincalls.CloseHandle(this.processSnapshot);

      this.wincalls.CloseHandle(this.targetProcess);

      return;
    }

    console.log('Process found, PID:', this.pid);

    this.waitingPrinted = false;

    const moduleEntry32: MODULEENTRY32_TYPE = this.wincalls.MODULEENTRY32_empty();

    const moduleSnapshot: HANDLE_PTR_TYPE = this.wincalls.CreateToolhelp32Snapshot(
      TH32CS_SNAPMODULE,
      this.pid
    );

    this.wincalls.Module32First(moduleSnapshot, moduleEntry32);

    do {
      if (joinName(moduleEntry32.szModule) === 'Baldur.exe') {
        break;
      }
    } while (this.wincalls.Module32Next(this.processSnapshot, moduleEntry32));

    this.modBaseAddr = koffi.address(moduleEntry32.modBaseAddr);

    this.targetProcess = this.wincalls.OpenProcess(
      PROCESS_VM_READ | PROCESS_QUERY_LIMITED_INFORMATION,
      true,
      this.pid
    );

    this.wincalls.CloseHandle(moduleSnapshot);
  }

  protected isProcessAlive(): boolean {
    const result: number[] = [0];

    this.wincalls.GetExitCodeProcess(this.targetProcess, result);

    return result[0] === STILL_ACTIVE;
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = this.isProcessAlive();

    if (!this.alive) {
      this.pid = null;

      this.wincalls.CloseHandle(this.processSnapshot);

      this.processSnapshot = null;

      this.wincalls.CloseHandle(this.targetProcess);

      this.targetProcess = null;

      return;
    }

    const offset: number = 0x68d434;

    const numEntities: number = this.memread.memReadNumber(
      this.targetProcess,
      this.modBaseAddr + BigInt(offset),
      'INT32'
    );

    const listPointer: bigint = this.modBaseAddr + BigInt(offset + 0x4 + 0x18);

    for (let i: number = 2000 * 16; i <= numEntities * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(
        BigInt(this.memread.memReadNumber(this.targetProcess, listPointer + BigInt(i + 8), 'PTR'))
      );
    }
  }
}
