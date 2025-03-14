import { ResBam } from '@chitin/res/impl/bam/res-bam';
import { handlers } from '@handlers';

export class ResImage {
  public base64: string;

  public size: Electron.Size;

  public loaded: boolean = false;

  constructor(bamCode: string) {
    const resBam: ResBam = handlers.chitin.ress.BAM[bamCode] as ResBam;

    if (!resBam) {
      return;
    }

    this.base64 = resBam.base64;

    this.size = resBam.size;

    this.loaded = true;
  }
}
