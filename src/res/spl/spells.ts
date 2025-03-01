import fs from 'fs';
import path from 'path';
import { handlers } from '../../handlers';
import { Spell } from './spell';

export class Spells {
  public spells: Spell[] = [];

  constructor() {
    const buffer: Buffer = fs.readFileSync(
      path.join(handlers.config.obj.path, 'data', 'Spells.bif')
    );

    const entriesCount: number = buffer.readInt32LE(0x8);

    const entriesOffset: number = buffer.readInt32LE(0x10);

    for (let i: number = 0; i < entriesCount; i++) {
      const entryOffset: number = entriesOffset + i * 16;

      const spellOffset: number = buffer.readInt32LE(entryOffset + 0x4);
      const spellSize: number = buffer.readInt32LE(entryOffset + 0x8);

      const spell: Spell = new Spell(buffer, spellOffset, spellSize);

      this.spells.push(spell);
    }
  }
}
