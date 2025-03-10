import { Entity } from './entity';

export class Timekeeper {
  private times: number[] = [0, 0];

  public push(entity: Entity): void {
    if (!entity) {
      return;
    }

    this.times.shift();

    this.times.push(entity.sprite.basic.time);
  }

  public get reloaded(): boolean {
    return this.times[0] > this.times[1];
  }
}
