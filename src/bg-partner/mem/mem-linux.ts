import { execSync } from 'child_process';
import { memReadNumber } from '../memread';
import { MemCommon } from './mem-common';

export class MemLinux extends MemCommon {
  public init(): void {
    this.pid = Number.parseInt(execSync('pidof BaldursGateII').toString(), 10);

    this.targetProcess = this.pid;

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

      this.targetProcess = null;

      return;
    }

    const numEntities: number = memReadNumber(this.pid, BigInt(0x55555613f776), 'INT16');

    const listPointer: bigint = BigInt(0x5555560bf780);

    for (let i = 2001 * 16; i <= numEntities * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(memReadNumber(this.pid, listPointer + BigInt(i + 8), 'PTR'));
    }
  }
}
