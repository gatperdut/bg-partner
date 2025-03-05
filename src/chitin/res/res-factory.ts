import { Resext } from '../../tables/resext';
import { Bif } from '../bif';
import { ResBam } from './impl/bam/res-bam';
import { Res } from './impl/res';
import { ResSpl } from './impl/res-spl';

export class ResFactory {
  public create(ext: Resext, buffer: Buffer, bifs: Bif[]): Res {
    switch (ext) {
      case 'SPL':
        return new ResSpl(buffer, bifs);
      case 'BAM':
        return new ResBam(buffer, bifs);
      default:
        return null;
    }
  }
}
