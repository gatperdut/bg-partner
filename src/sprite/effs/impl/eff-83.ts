import { ResBam } from '../../../chitin/res/impl/bam/res-bam';
import { ResPro } from '../../../chitin/res/impl/res-pro';
import { handlers } from '../../../handlers';
import { projTable } from '../../../tables/proj';
import { EffSource } from '../effs';
import { Eff } from './eff';

export class Eff83 extends Eff {
  public projImage: string;

  constructor(public id: number, protected base: bigint, public source: EffSource) {
    super(id, base, source);

    const hand = handlers;
    const tab = projTable;

    const projBam: ResBam = handlers.chitin.ress.BAM[
      (handlers.chitin.ress.PRO[projTable[this.param2].toLowerCase()] as ResPro)?.bam
    ] as ResBam;

    projBam?.image().then((buf: Buffer): void => {
      this.projImage = buf.toString('base64');
    });
  }
}
