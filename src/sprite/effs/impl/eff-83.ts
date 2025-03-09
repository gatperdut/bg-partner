import _ from 'lodash-es';
import { ResBam } from '../../../chitin/res/impl/bam/res-bam';
import { ResItm } from '../../../chitin/res/impl/res-itm';
import { handlers } from '../../../handlers';
import { ProKey, proTab } from '../../../tables/pro';
import { EffSource } from '../effs';
import { Eff } from './eff';

export type Eff83Entry = {
  pro: ResItm;

  image: string;
};

export class Eff83 extends Eff {
  public entries: Eff83Entry[] = [];

  constructor(public id: number, protected base: bigint, public source: EffSource) {
    super(id, base, source);

    _.each(
      handlers.chitin.proValue2Itms[proTab[(this.param2 + 1) as ProKey]],
      (proItm: ResItm): void => {
        const proBam: ResBam = handlers.chitin.ress.BAM[proItm.bam] as ResBam;

        if (!proBam?.image) {
          return;
        }

        const eff83Pro: Eff83Entry = {
          pro: proItm,
          image: proBam.image,
        };

        this.entries.push(eff83Pro);
      }
    );
  }
}
