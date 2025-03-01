import { joinASCII } from '../../utils';

export class Spell {
  constructor(buffer: Buffer, offset: number, size: number) {
    const data: Buffer = Uint8Array.prototype.slice.call(buffer, offset, offset + size);

    console.log(data.readInt32LE(0x8));
  }

  private readStr(buffer: Buffer, base: number, length: number): string {
    const result: number[] = [];

    for (let i: number = 0; i < length; i++) {
      result.push(buffer.readUInt8(base + i));
    }

    return joinASCII(result);
  }
}
