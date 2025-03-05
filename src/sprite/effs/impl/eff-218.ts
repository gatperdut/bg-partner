import { ResBAM } from '../../../chitin/res/impl/bam/res-bam';
import { ResSPL } from '../../../chitin/res/impl/res-spl';
import { handlers } from '../../../handlers';
import { Eff } from './eff';

// Protection_Stoneskin
export class Eff218 extends Eff {
  public image: string;

  public size: Electron.Size;

  constructor(public id: number, protected base: bigint) {
    super(id, base);

    const resBAM: ResBAM = handlers.chitin.ress.BAM[
      (handlers.chitin.ress.SPL[this.resSource] as ResSPL).bam
    ] as ResBAM;

    resBAM.image().then((imageBuf: Buffer): void => {
      this.image = imageBuf.toString('base64');
    });

    this.size = resBAM.size;
  }

  public summary(): void {
    super.summary();
  }
}
