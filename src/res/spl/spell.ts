import { joinASCII } from '../../utils';

export class Spell {
  constructor(buffer: Buffer, offset: number, size: number) {
    const data: Buffer = Uint8Array.prototype.slice.call(buffer, offset, offset + size);

    const featureTableOffset = data.readInt32LE(0x6a);

    const featureOffset = data.readUint16LE(0x6e);
    const featureCount = data.readUint16LE(0x70);

    for (let i = 0; i < featureCount; i++) {
      console.log(this.readStr(data, featureTableOffset + i * 48 + 0x14, 8));
    }
  }

  private readStr(buffer: Buffer, base: number, length: number): string {
    const result: number[] = [];

    for (let i: number = 0; i < length; i++) {
      result.push(buffer.readUInt8(base + i));
    }

    return joinASCII(result);
  }
}
