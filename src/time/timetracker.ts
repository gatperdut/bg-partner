import { Entity } from '@entities/entity';
import { handlers } from '@handlers';
import * as _ from 'lodash-es';

export class Timetracker {
  private size: number = 4;

  private times: number[] = new Array(this.size).fill(0);

  public time: number;

  public running: boolean;

  public push(entity: Entity): void {
    if (!entity) {
      return;
    }

    this.time = handlers.memread.memReadNumber(
      entity.sprite.basic.infGameAddr + BigInt(0x3fa0),
      'UINT32'
    );

    this.running = !!handlers.memread.memReadNumber(
      entity.sprite.basic.infGameAddr + BigInt(0x3fa0 + 0x4),
      'UINT8'
    );

    this.times.shift();

    this.times.push(this.time);
  }

  public clear(): void {
    for (let i: number = 0; i < this.size; i++) {
      this.times[i] = 0;
    }
  }

  public get reloaded(): boolean {
    return !!_.find(
      this.times.slice(0, this.size - 1),
      (time: number): boolean => time > this.times[this.size - 1]
    );
  }
}
