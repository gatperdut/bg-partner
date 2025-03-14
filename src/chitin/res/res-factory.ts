import { Bif } from '@chitin/bif';
import { ResBam } from '@chitin/res/impl/bam/res-bam';
import { Res } from '@chitin/res/impl/res';
import { ResItm } from '@chitin/res/impl/res-itm';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResextValue } from '@tables/resext';

export class ResFactory {
  public create(ext: ResextValue, buffer: Buffer, bifs: Bif[]): Res {
    switch (ext) {
      case 'ITM':
        return new ResItm(buffer, bifs);
      case 'SPL':
        return new ResSpl(buffer, bifs);
      case 'BAM':
        return new ResBam(buffer, bifs);
      default:
        return null;
    }
  }
}
