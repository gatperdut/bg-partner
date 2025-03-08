import { Bif } from '../../../chitin/bif';
import { Resext } from '../../../tables/resext';
import { readBufferString } from '../../../utils';

export class Res {
  public name: string;

  public file: Buffer;

  constructor(public resext: Resext, buffer: Buffer, bifs: Bif[]) {
    this.name = readBufferString(buffer, 0x0, 8).trim().toLowerCase();

    const locator: Uint32Array = new Uint32Array([buffer.readUInt32LE(0xa)]);

    const bif: Bif = bifs[(locator[0] >> 20) & 0xfff];

    const fileIndex: number = locator[0] & 0x3fff;

    this.file = bif.files[fileIndex];
  }
}
