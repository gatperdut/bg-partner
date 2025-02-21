import { execSync } from 'child_process';
import { handlers } from '../main';
import { MemscanCommon } from './memscan-common';

export class MemscanLinux extends MemscanCommon {
  private pidGet(): number {
    return Number.parseInt(execSync('pidof BaldursGateII').toString(), 10);
  }

  public init(): void {
    this.pid = this.pidGet();

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

  protected isProcessAlive(): boolean {
    return !!this.pidGet();
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = this.isProcessAlive();

    if (!this.alive) {
      this.pid = null;

      this.targetProcess = null;

      return;
    }

    const numEntities: number = handlers.memread.memReadNumber(
      this.pid,
      BigInt(0x55555613f776),
      'INT16'
    ) as number;

    const listPointer: bigint = BigInt(0x5555560bf780);

    for (let i = 2001 * 16; i <= numEntities * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(
        BigInt(handlers.memread.memReadNumber(this.pid, listPointer + BigInt(i + 8), 'PTR'))
      );
    }
  }
}
