import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResSpl extends Res {
  public bam: string;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('SPL', buffer, bifs);

    const signature: string = readBufferString(this.file, 0x0, 4).trim();

    const v: string = readBufferString(this.file, 0x4, 4).trim();

    this.bam = readBufferString(this.file, 0x3a, 8);
  }
}
