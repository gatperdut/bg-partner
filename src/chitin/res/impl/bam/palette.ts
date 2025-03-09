import _ from 'lodash-es';

export class Palette {
  public values: number[][];

  public transpIdx: number;

  public rleIdx: number;

  constructor(buffer: Buffer, offset: number) {
    const paletteOffset: number = buffer.readUint32LE(offset);

    this.values = _.chunk([...buffer.subarray(paletteOffset, paletteOffset + 256 * 4)], 4);

    this.rleIdx = buffer.readUint8(0xb);
  }
}
