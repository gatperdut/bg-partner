import { handlers } from '@handlers';
import { readBufferString } from '@utils';
import fs from 'fs';
import path from 'path';

export type Tlks = Record<number, string>;

export class Tlk {
  public tlks: Tlks = {};

  constructor() {
    const file: Buffer = fs.readFileSync(
      path.join(handlers.config.obj.path, 'lang', handlers.config.obj.locale, 'dialog.tlk')
    );

    const strsCount: number = file.readUint32LE(0xa);

    const strsOffset: number = file.readUint32LE(0xe);

    for (let i: number = 0; i < strsCount; i++) {
      const strLength: number = file.readUint32LE(0x12 + i * 26 + 0x16);

      const strOffset: number = file.readUint32LE(0x12 + i * 26 + 0x12);

      this.tlks[i] = readBufferString(file, strsOffset + strOffset, strLength);
    }
  }
}
