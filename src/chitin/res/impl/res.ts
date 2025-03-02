import { Bif } from '../../../chitin/bif';
import { Resext } from '../../../tables/resext';
import { readBufferString } from '../../../utils';

export class Res {
  public signature: string;

  public v: string;

  public name: string;

  public bif: Bif;

  public fileIndex: number;

  constructor(public resext: Resext, buffer: Buffer, bifs: Bif[]) {
    this.name = readBufferString(buffer, 0x0, 8);

    const locator: Uint32Array = new Uint32Array(1);

    locator[0] = buffer.readUInt32LE(0xa);

    this.bif = bifs[(locator[0] >> 20) & 0xfff];

    this.fileIndex = locator[0] & 0x3fff;
  }
}
