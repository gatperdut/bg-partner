import _ from 'lodash-es';
import { ResBam } from '../../../chitin/res/impl/bam/res-bam';
import { ResItm } from '../../../chitin/res/impl/res-itm';
import { handlers } from '../../../handlers';
import { ProKey, proTab } from '../../../tables/pro';
import { EffSource } from '../effs';
import { Eff } from './eff';

export class Eff83 extends Eff {
  public proImages: string[] = [];

  public proItms: ResItm[];

  constructor(public id: number, protected base: bigint, public source: EffSource) {
    super(id, base, source);

    const hand = handlers;

    const tab = proTab;

    this.proItms = handlers.chitin.proValue2Itms[proTab[(this.param2 + 1) as ProKey]];

    const proBams: ResBam[] = _.compact(
      _.map(this.proItms, (proItm: ResItm) => handlers.chitin.ress.BAM[proItm.bam] as ResBam)
    );

    _.each(proBams, (proBam: ResBam): void => {
      proBam.image().then((buf: Buffer): void => {
        this.proImages.push(buf.toString('base64'));
      });
    });
  }
}
