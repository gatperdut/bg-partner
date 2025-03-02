import { Bif } from '../../../chitin/bif';
import { readBufferString } from '../../../utils';
import { Res } from './res';

export class ResSPL extends Res {
  public bam: string;

  constructor(buffer: Buffer, bifs: Bif[]) {
    super('SPL', buffer, bifs);

    const file: Buffer = this.bif.files[this.fileIndex];

    this.signature = readBufferString(file, 0x0, 4).trim();

    this.v = readBufferString(file, 0x4, 4).trim();

    this.bam = readBufferString(file, 0x3a, 8);
  }
}
