import { Bif } from '../../../chitin/bif';
import { handlers } from '../../../handlers';
import { readBufferString } from '../../../utils';
import { ResImage } from '../res-image';
import { Res } from './res';

export class ResSpl extends Res {
  public name: string;

  public desc: string;

  private bamCode: string;

  public resImage: ResImage;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('SPL', buffer, bifs);

    this.name = handlers.tlk.tlks[this.file.readUint16LE(0x8)];

    this.desc = handlers.tlk.tlks[this.file.readUint16LE(0x50)];

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
