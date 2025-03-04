import _ from 'lodash-es';

export class Palette {
  public values: number[][];

  public transpIdx: number;

  public rleIndex: number;

  constructor(buffer: Buffer, offset: number) {
    const paletteOffset: number = buffer.readUint32LE(offset);

    this.values = _.chunk([...buffer.subarray(paletteOffset, paletteOffset + 256 * 4)], 4);

    this.rleIndex = buffer.readUint8(0xb);

    this.transpIdx = Math.max(
      _.findIndex(this.values, (paletteValue: number[]): boolean =>
        _.isEqual(paletteValue, [0x00, 0xff, 0x00, 0x00])
      ),
      0
    );

    this.values[this.rleIndex] = [0x00, 0x00, 0x00, 0x00];
  }
}
