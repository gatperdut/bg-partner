import { Resext } from '../../tables/resext';
import { Bif } from '../bif';
import { Res } from './impl/res';
import { ResBAM } from './impl/res-bam';
import { ResSPL } from './impl/res-spl';

export class ResFactory {
  public create(ext: Resext, buffer: Buffer, bifs: Bif[]): Res {
    switch (ext) {
      case 'SPL':
        return new ResSPL(buffer, bifs);
      case 'BAM':
        return new ResBAM(buffer, bifs);
      default:
        return null;
    }
  }
}
