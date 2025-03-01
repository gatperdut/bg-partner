import fs from 'fs';
import path from 'path';

export type ComponentsRecord = Record<string, string>;

export class Components {
  public componentsRecord: ComponentsRecord = {};

  private register(name: string, segments: string[]): void {
    this.componentsRecord[name] = fs.readFileSync(
      path.join(__dirname, ...['views', ...segments]),
      'utf-8'
    );
  }

  // TODO can this be automatized?
  constructor() {
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
