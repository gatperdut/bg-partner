import { Bif } from '@chitin/bif';
import { ResBam } from '@chitin/res/impl/bam/res-bam';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { Res } from '@chitin/res/impl/res';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResextValue } from '@tables/resext';
import { ResEff } from './impl/eff/res-eff';

export class ResBifFactory {
  public create(ext: ResextValue, buffer: Buffer, bifs: Bif[]): Res {
    switch (ext) {
      case 'BAM':
        const resBam = new ResBam();

        resBam.fromBif(buffer, bifs);

        return resBam;
      case 'EFF':
        const resEff = new ResEff();

        resEff.fromBif(buffer, bifs);

        return resEff;
      case 'ITM':
        const resItm = new ResItm();

        resItm.fromBif(buffer, bifs);

        return resItm;
      case 'SPL':
        const resSpl = new ResSpl();

        resSpl.fromBif(buffer, bifs);

        return resSpl;
      default:
        return null;
    }
  }
}
