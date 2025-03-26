import { ResBam } from '@chitin/res/impl/bam/res-bam';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { Res } from '@chitin/res/impl/res';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResextValue } from '@tables/resext';
import { ResEff } from './impl/eff/res-eff';

export class ResOverrideFactory {
  public create(ext: ResextValue, code: string, file: Buffer): Res {
    switch (ext) {
      case 'BAM':
        const resBam = new ResBam();

        resBam.fromFile(code, file);

        return resBam;
      case 'EFF':
        const resEff = new ResEff();

        resEff.fromFile(code, file);

        return resEff;
      case 'ITM':
        const resItm = new ResItm();

        resItm.fromFile(code, file);

        return resItm;
      case 'SPL':
        const resSpl = new ResSpl();

        resSpl.fromFile(code, file);

        return resSpl;
      default:
        return null;
    }
  }
}
