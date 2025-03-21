import { ResItm } from '@chitin/res/impl/res-itm';
import { handlers } from '@handlers';
import { EffSource } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { ProKey, proTab } from '@tables/pro';
import _ from 'lodash';

export class Eff83 extends Eff {
  public proItms: ResItm[];

  constructor(base: bigint, source: EffSource) {
    super(83, base, source);

    this.proItms = _.filter(
      handlers.chitin.proValue2Itms[proTab[(this.param2 + 1) as ProKey]], // TODO +1 may be unnecessary in BG1
      (proItm: ResItm): boolean => {
        return !!proItm.resImage;
      },
    );
  }
}
