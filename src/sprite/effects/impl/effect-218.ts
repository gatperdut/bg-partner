import { ResBAM } from '../../../chitin/res/impl/res-bam';
import { ResSPL } from '../../../chitin/res/impl/res-spl';
import { handlers } from '../../../handlers';
import { Effect } from './effect';

// Protection_Stoneskin
export class Effect218 extends Effect {
  public image: string;

  constructor(public id: number, protected base: bigint) {
    super(id, base);

    this.image = (
      handlers.chitin.ress.BAM[(handlers.chitin.ress.SPL[this.resSource] as ResSPL).bam] as ResBAM
    ).image.toString('base64');
  }

  public summary(): void {
    super.summary();
  }
}
