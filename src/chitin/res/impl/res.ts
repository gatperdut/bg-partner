import { Bif } from '@chitin/bif';
import { ResextValue } from '@tables/resext';
import { readBufferString } from '@utils';

export class Res {
  public code: string;

  protected file: Buffer;

  constructor(public resext: ResextValue) {
    // Empty
  }

  public fromBif(buffer: Buffer, bifs: Bif[]): void {
    this.code = readBufferString(buffer, 0x0, 8).trim().toLowerCase();

    const locator: Uint32Array = new Uint32Array([buffer.readUInt32LE(0xa)]);

    const bif: Bif = bifs[(locator[0] >> 20) & 0xfff];

    const fileIndex: number = locator[0] & 0x3fff;

    this.file = bif.files[fileIndex];

    this.run();
  }

  public fromFile(code: string, file: Buffer): void {
    this.code = code;

    this.file = file;

    this.run();
  }

  protected run(): void {
    // Empty
  }
}
