import { Bif } from '@chitin/bif';
import { ResBam } from '@chitin/res/impl/bam/res-bam';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { Res } from '@chitin/res/impl/res';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResextValue } from '@tables/resext';
import { ResEff } from './impl/eff/res-eff';

export class ResFactory {
  public create(ext: ResextValue, buffer: Buffer, bifs: Bif[]): Res {
    switch (ext) {
      case 'BAM':
        return new ResBam(buffer, bifs);
      case 'EFF':
        return new ResEff(buffer, bifs);
      case 'ITM':
        return new ResItm(buffer, bifs);
      case 'SPL':
        return new ResSpl(buffer, bifs);
      default:
        return null;
    }
  }
}
