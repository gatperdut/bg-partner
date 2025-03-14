import { handlers } from '@handlers';
import { readBufferString } from '@utils';
import fs from 'fs';
import path from 'path';

export class Bif {
  public name: string;

  public files: Buffer[] = [];

  constructor(chitinBuffer: Buffer, chitinOffset: number) {
    const nameOffset: number = chitinBuffer.readInt32LE(chitinOffset + 0x4);

    const nameLength: number = chitinBuffer.readInt16LE(chitinOffset + 0x8);

    this.name = readBufferString(chitinBuffer, nameOffset, nameLength);

    this.read(this.name);
  }

  private read(name: string): void {
    const buffer: Buffer = fs.readFileSync(path.join(handlers.config.obj.path, ...name.split('/')));

    const fileEntriesCount: number = buffer.readInt32LE(0x8);

    const filesEntriesOffset: number = buffer.readInt32LE(0x10);

    for (let i: number = 0; i < fileEntriesCount; i++) {
      const fileEntryOffset: number = filesEntriesOffset + i * 16;

      const fileOffset: number = buffer.readUint32LE(fileEntryOffset + 0x4);

      const fileSize: number = buffer.readUint32LE(fileEntryOffset + 0x8);

      const file = buffer.subarray(fileOffset, fileOffset + fileSize);

      this.files.push(file);
    }
  }
}
