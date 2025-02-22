import { execSync } from 'child_process';
import { handlers } from '../handlers';
import { MemscanOs } from './memscan';

export class MemscanLinux extends MemscanOs {
  constructor() {
    super();

    this.offsetEntitiesNum = BigInt(0x55555613f776);

    this.offsetEntities = BigInt(0x5555560bf780);
  }

  private pidGet(): number {
    try {
      return Number.parseInt(execSync('pidof BaldursGateII').toString(), 10);
    } catch (err) {
      return null;
    }
  }

  public init(): void {
    this.pid = this.pidGet();

    if (!this.pid) {
      if (!this.printed) {
        console.log('Waiting for process...');

        this.printed = true;
      }

      this.gameObjectPtrs = [];

      return;
    }

    console.log('Process found, PID:', this.pid);

    this.printed = false;
  }

  private get aliveGet(): boolean {
    return !!this.pidGet();
  }

  public run(): void {
    this.gameObjectPtrs = [];

    this.alive = this.aliveGet;

    if (!this.alive) {
      this.pid = null;

      return;
    }

    const entitiesNum: number = handlers.memread.memReadNumber(this.offsetEntitiesNum, 'INT16');

    for (let i = 2001 * 16; i <= entitiesNum * 16 + 96; i += 16) {
      this.gameObjectPtrs.push(
        BigInt(handlers.memread.memReadBigint(this.offsetEntities + BigInt(i + 8), 'ADDR'))
      );
    }
  }
}
