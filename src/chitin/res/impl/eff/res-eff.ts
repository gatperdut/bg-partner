import { Bif } from '@chitin/bif';
import { ResEffHit } from '@chitin/res/impl/eff/res-eff-hit';
import { Res } from '@chitin/res/impl/res';

export class ResEff extends Res {
  public resEffHit: ResEffHit;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('EFF', buffer, bifs);

    this.resEffHit = new ResEffHit(this.file);
  }
}
