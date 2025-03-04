import { Resext } from '../../tables/resext';
import { Bif } from '../bif';
import { ResBAM } from './impl/bam/res-bam';
import { Res } from './impl/res';
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
