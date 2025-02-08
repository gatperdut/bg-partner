import koffi from 'koffi';
import {
  PROCESS_QUERY_LIMITED_INFORMATION,
  PROCESS_VM_READ,
  TH32CS_SNAPMODULE,
  TH32CS_SNAPPROCESS,
} from './koffi/defs/constants';
import { HANDLE_PTR_TYPE } from './koffi/defs/handles';
import {
  CloseHandle,
  CreateToolhelp32Snapshot,
  Module32First,
  Module32Next,
  OpenProcess,
  Process32First,
  Process32Next,
} from './koffi/defs/methods/process';
import { MODULEENTRY32_TYPE, MODULEENTRY32_empty } from './koffi/defs/structs/moduleentry32';
import { PROCESSENTRY32_TYPE, PROCESSENTRY32_empty } from './koffi/defs/structs/processentry32';
import { memReadNumber } from './koffi/memread';
import { isProcessAlive } from './koffi/system';
import { joinName } from './utils';

export class MemHandler {
  private processSnapshot: HANDLE_PTR_TYPE;

  public processHandle: HANDLE_PTR_TYPE;

  public pid: number;

  public modBaseAddr: bigint;

  public gameObjectPtrs: number[];

  public alive: boolean = false;

  private waitingPrinted: boolean = false;

  constructor() {
    // Empty
  }

  public init(): void {
    this.processSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);

    const processEntry32: PROCESSENTRY32_TYPE = PROCESSENTRY32_empty();

    Process32First(this.processSnapshot, processEntry32);

    do {
      if (joinName(processEntry32.szExeFile) === 'Baldur.exe') {
        this.pid = processEntry32.th32ProcessID;

        break;
      }
    } while (Process32Next(this.processSnapshot, processEntry32));

    if (!this.pid) {
      if (!this.waitingPrinted) {
        console.log('Waiting for process...');

        this.waitingPrinted = true;
      }

      this.gameObjectPtrs = [];

      CloseHandle(this.processSnapshot);

      CloseHandle(this.processHandle);

      return;
    }

    console.log('Process found, PID:', this.pid);

    this.waitingPrinted = false;

    const moduleEntry32: MODULEENTRY32_TYPE = MODULEENTRY32_empty();

    const moduleSnapshot: HANDLE_PTR_TYPE = CreateToolhelp32Snapshot(TH32CS_SNAPMODULE, this.pid);

    Module32First(moduleSnapshot, moduleEntry32);

    do {
      if (joinName(moduleEntry32.szModule) === 'Baldur.exe') {
        break;
      }
    } while (Module32Next(this.processSnapshot, moduleEntry32));

    this.modBaseAddr = koffi.address(moduleEntry32.modBaseAddr);

    this.processHandle = OpenProcess(
      PROCESS_VM_READ | PROCESS_QUERY_LIMITED_INFORMATION,
      true,
      this.pid
    );

    CloseHandle(moduleSnapshot);
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = isProcessAlive(this.processHandle);

    if (!this.alive) {
      this.pid = null;

      CloseHandle(this.processSnapshot);

      this.processSnapshot = null;

      CloseHandle(this.processHandle);

      this.processHandle = null;

      return;
    }

    const offset: number = 0x68d434;

    const numEntities: number = memReadNumber(
      this.processHandle,
      this.modBaseAddr + BigInt(offset),
      'INT32'
    );

    const listPointer: bigint = this.modBaseAddr + BigInt(offset + 0x4 + 0x18);

    for (let i = 2000 * 16; i <= numEntities * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(
        memReadNumber(this.processHandle, listPointer + BigInt(i + 8), 'PTR')
      );
    }
  }
}
