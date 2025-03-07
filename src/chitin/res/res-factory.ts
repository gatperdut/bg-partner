import { Resext } from '../../tables/resext';
import { Bif } from '../bif';
import { ResBam } from './impl/bam/res-bam';
import { Res } from './impl/res';
import { ResItm } from './impl/res-itm';
import { ResSpl } from './impl/res-spl';

export class ResFactory {
  public create(ext: Resext, buffer: Buffer, bifs: Bif[]): Res {
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
