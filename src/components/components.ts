import fs from 'fs';
import path from 'path';

export type ComponentsRecord = Record<string, string>;

export class Components {
  public components: ComponentsRecord = {};

  private register(name: string, segments: string[]): void {
    this.components[name] = fs.readFileSync(
      path.join(__dirname, ...['views', ...segments]),
      'utf-8'
    );
  }

  // TODO can this be automatized?
  constructor() {
    this.register('buffSingle', ['sheet', 'components', 'buffs', 'buff-single', 'buff-single.hbs']);

    this.register('buffGroup83', [
      'sheet',
      'components',
      'buffs',
      'buff-group',
      'impl',
      'buff-group-83',
      'buff-group-83.hbs',
    ]);

    this.register('buffGroup83Pros', [
      'sheet',
      'components',
      'buffs',
      'buff-group',
      'impl',
      'buff-group-83',
      'tooltips',
      'pros.hbs',
    ]);

    this.register('buffGroup102', [
      'sheet',
      'components',
      'buffs',
      'buff-group',
      'impl',
      'buff-group-102',
      'buff-group-102.hbs',
    ]);

    this.register('buffGroupStub', [
      'sheet',
      'components',
      'buffs',
      'buff-group',
      'impl',
      'buff-group-stub',
      'buff-group-stub.hbs',
    ]);

    this.register('buffs', ['sheet', 'components', 'buffs', 'buffs', 'buffs.hbs']);

    this.register('abilities', ['sheet', 'components', 'abilities', 'abilities.hbs']);

    this.register('abilitiesGroup', [
      'sheet',
      'components',
      'abilities-group',
      'abilities-group.hbs',
    ]);

    this.register('resistances', ['sheet', 'components', 'resistances', 'resistances.hbs']);

    this.register('resistancesGroup', [
      'sheet',
      'components',
      'resistances-group',
      'resistances-group.hbs',
    ]);

    this.register('saves', ['sheet', 'components', 'saves', 'saves.hbs']);

    this.register('savesGroup', ['sheet', 'components', 'saves-group', 'saves-group.hbs']);
  }
}
