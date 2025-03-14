import * as _ from 'lodash-es';
import { ResItm } from '../../../chitin/res/impl/res-itm';
import { handlers } from '../../../handlers';
import { ProKey, proTab } from '../../../tables/pro';
import { EffSource } from '../effs';
import { Eff } from './eff';

export class Eff83 extends Eff {
  public proItms: ResItm[];

  constructor(protected base: bigint, public source: EffSource) {
    super(83, base, source);

    this.proItms = _.filter(
      handlers.chitin.proValue2Itms[proTab[(this.param2 + 1) as ProKey]],
      (proItm: ResItm): boolean => {
        return !!proItm.resImage;
      }
    );
  }
}
