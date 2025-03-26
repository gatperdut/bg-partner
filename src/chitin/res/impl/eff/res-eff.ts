import { ResEffHit } from '@chitin/res/impl/eff/res-eff-hit';
import { Res } from '@chitin/res/impl/res';
import { EffKey } from '@tables/eff';

export class ResEff extends Res {
  // Memory fields
  public key: EffKey;

  // Custom fields
  public resEffHit: ResEffHit;

  constructor() {
    super('EFF');
  }

  protected run(): void {
    this.key = this.file.readInt32LE(0x10) as EffKey;

    this.resEffHit = new ResEffHit(this.file);
  }
}
