import { execSync } from 'child_process';
import { MemCommon } from './mem-common';

export class MemLinux extends MemCommon {
  public init(): void {
    this.pid = Number.parseInt(execSync('pidof BaldursGateII').toString(), 10);

    if (!this.pid) {
      if (!this.waitingPrinted) {
        console.log('Waiting for process...');

        this.waitingPrinted = true;
      }

      this.gameObjectPtrs = [];

      return;
    }

    console.log('Process found, PID:', this.pid);

    this.waitingPrinted = false;
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = this.isProcessAlive();

    if (!this.alive) {
      this.pid = null;

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
