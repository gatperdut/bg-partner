import { ResImageBase } from '@chitin/res/image/res-image-base';
import { ResBam } from '@chitin/res/impl/bam/res-bam';
import { handlers } from '@handlers';

export class ResImage extends ResImageBase {
  public loaded: boolean = false;

  constructor(bamCode: string) {
    super();

    if (bamCode.endsWith('c')) {
      bamCode = bamCode.slice(0, bamCode.length - 1) + 'b';
    }

    const resBam: ResBam = handlers.chitin.ress.BAM[bamCode] as ResBam;

    if (!resBam) {
      return;
    }

    this.base64 = resBam.base64;

    this.size = resBam.size;

    this.loaded = true;
  }
}
