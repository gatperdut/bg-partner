import { Entity } from '../entities/entity';
import { handlers } from '../handlers';

export class Timetracker {
  private times: number[] = [0, 0];

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

    this.times.push();
  }

  public get reloaded(): boolean {
    return this.times[0] > this.times[1];
  }
}
