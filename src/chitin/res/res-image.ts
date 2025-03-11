import { handlers } from '../../handlers';
import { ResBam } from './impl/bam/res-bam';

export class ResImage {
  public base64: string;

  public size: Electron.Size;

  public loaded: boolean = false;

  constructor(bamCode: string) {
    const resBam: ResBam = handlers.chitin.ress.BAM[bamCode] as ResBam;

    if (!resBam) {
      return;
    }

    this.base64 = resBam.image;

    this.size = resBam.size;

    this.loaded = true;
  }
}
