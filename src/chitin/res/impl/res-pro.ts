import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';
import { ResItm } from './res-itm';

export class ResPro extends Res {
  public projType: number;

  public bam: string;

  public resItm: ResItm;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('PRO', buffer, bifs);

    const signature: string = readBufferString(this.file, 0x0, 4).trim();

    const v: string = readBufferString(this.file, 0x4, 4).trim();

    // TODO check offset and type in win32
    // this.projType = buffer.readInt16LE(0x8);
    this.projType = buffer.readUint8(0x9);

    if (this.projType !== 2 && this.projType !== 3) {
      return;
    }

    this.bam = readBufferString(this.file, 0x104, 8).toLowerCase();
  }
}
