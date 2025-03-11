import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { ResImage } from '../res-image';
import { Res } from './res';

export class ResSpl extends Res {
  private bamCode: string;

  public resImage: ResImage;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('SPL', buffer, bifs);

    this.bamCode = readBufferString(this.file, 0x3a, 8).toLowerCase();
  }

  public resImageSet(): void {
    if (!this.bamCode) {
      return;
    }

    const resImage: ResImage = new ResImage(this.bamCode);

    if (!resImage.loaded) {
      return;
    }

    this.resImage = resImage;
  }
}
