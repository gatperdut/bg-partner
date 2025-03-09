import _ from 'lodash-es';
import { ResBam } from '../../../chitin/res/impl/bam/res-bam';
import { ResItm } from '../../../chitin/res/impl/res-itm';
import { handlers } from '../../../handlers';
import { ProKey, proTab } from '../../../tables/pro';
import { EffSource } from '../effs';
import { Eff } from './eff';

export type Eff83Pro = {
  pro: ResItm;

  image: string;
};

export class Eff83 extends Eff {
  public pros: Eff83Pro[] = [];

  constructor(public id: number, protected base: bigint, public source: EffSource) {
    super(id, base, source);

    _.each(
      handlers.chitin.proValue2Itms[proTab[(this.param2 + 1) as ProKey]],
      (proItm: ResItm): void => {
        const proBam: ResBam = handlers.chitin.ress.BAM[proItm.bamCode] as ResBam;

        if (!proBam?.image) {
          return;
        }

        const eff83Pro: Eff83Pro = {
          pro: proItm,
          image: proBam.image,
        };

        this.pros.push(eff83Pro);
      }
    );
  }
}
