import { handlers } from '../../handlers';
import { readBufferString } from '../../utils';

export class Spell {
  public code: string;

  public name: string;

  public mschool: number;

  public msectype: number;

  public description: string;

  public level: number;

  public bam: string;

  // TODO
  public bypassMirrorImage: boolean;

  constructor(buffer: Buffer, offset: number, size: number) {
    const data: Buffer = Uint8Array.prototype.slice.call(buffer, offset, offset + size);

    const extendedHeaderOffset: number = data.readInt32LE(0x64);

    this.bam = readBufferString(data, extendedHeaderOffset + 0x4, 8);

    if (!this.bam) {
      console.log('no BAM?');
    }

    this.code = this.bam.slice(0, -1);

    this.mschool = data.readInt8(0x25);

    this.msectype = data.readInt8(0x27);

    const nameRef1: number = data.readInt32LE(0x8);

    const nameRef2: number = data.readInt32LE(0xc);

    this.name =
      handlers.talks.talks[nameRef1] || handlers.talks.talks[nameRef2] || 'No name available.';

    const descriptionRef: number = data.readInt32LE(0x50);

    this.description = handlers.talks.talks[descriptionRef] || 'No description available.';

    this.level = data.readInt32LE(0x34);
  }
}
