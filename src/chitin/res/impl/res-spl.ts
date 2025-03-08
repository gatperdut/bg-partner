import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResSpl extends Res {
  public bam: string;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('SPL', buffer, bifs);

    this.bam = readBufferString(this.file, 0x3a, 8).toLowerCase();
  }
}
