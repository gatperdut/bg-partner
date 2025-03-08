import _ from 'lodash-es';
import { ResBam } from '../../../chitin/res/impl/bam/res-bam';
import { ResItm } from '../../../chitin/res/impl/res-itm';
import { handlers } from '../../../handlers';
import { proTable, ProTableKey } from '../../../tables/pro';
import { EffSource } from '../effs';
import { Eff } from './eff';

export class Eff83 extends Eff {
  public projImage: string;

  constructor(public id: number, protected base: bigint, public source: EffSource) {
    super(id, base, source);

    const hand = handlers;
    const tab = proTable;

    const proItmKey = _.find(_.keys(handlers.chitin.ress.ITM), (resKey: string): boolean => {
      return (
        (handlers.chitin.ress.ITM[resKey] as ResItm).pro === proTable[this.param2 as ProTableKey]
      );
    });

    if (!proItmKey) {
      return;
    }

    const proBam: ResBam = handlers.chitin.ress.BAM[
      (handlers.chitin.ress.ITM[proItmKey] as ResItm)?.bam
    ] as ResBam;

    proBam?.image().then((buf: Buffer): void => {
      this.projImage = buf.toString('base64');
    });
  }
}
