import fs from 'fs';
import path from 'path';
import { handlers } from '../../handlers';
import { readBufferString } from '../../utils';

export type TalksRecord = Record<number, string>;

export class Talks {
  public talks: Record<number, string> = {};

  constructor() {
    const buffer: Buffer = fs.readFileSync(
      path.join(handlers.config.obj.path, 'lang', handlers.config.obj.locale, 'dialog.tlk')
    );

    const stringsCount: number = buffer.readInt32LE(0xa);

    const stringsOffset: number = buffer.readInt32LE(0xe);

    for (let i: number = 0; i < stringsCount; i++) {
      const entryOffset: number = 18 + i * 26;

      const stringOffset: number = buffer.readInt32LE(entryOffset + 0x12);

      const stringSize: number = buffer.readInt32LE(entryOffset + 0x16);

      this.talks[i] = readBufferString(buffer, stringsOffset + stringOffset, stringSize);
    }
  }
}
