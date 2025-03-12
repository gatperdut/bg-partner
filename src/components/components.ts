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
    this.register('buffDuration', [
      'sheet',
      'components',
      'buffs',
      'parts',
      'buff-duration',
      'buff-duration.hbs',
    ]);

    this.register('buffImage', [
      'sheet',
      'components',
      'buffs',
      'parts',
      'buff-image',
      'buff-image.hbs',
    ]);

    this.register('buffLevels', [
      'sheet',
      'components',
      'buffs',
      'parts',
      'buff-levels',
      'buff-levels.hbs',
    ]);

    this.register('buffRight', [
      'sheet',
      'components',
      'buffs',
      'parts',
      'buff-right',
      'buff-right.hbs',
    ]);

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

    this.register('buffGroup83Tooltip', [
      'sheet',
      'components',
      'buffs',
      'buff-group',
      'impl',
      'buff-group-83',
      'tooltips',
      'buff-group-83-tooltip.hbs',
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

    this.register('items', ['sheet', 'components', 'items', 'items', 'items.hbs']);

    this.register('item', ['sheet', 'components', 'items', 'item', 'item.hbs']);

    this.register('itemImage', [
      'sheet',
      'components',
      'items',
      'parts',
      'item-image',
      'item-image.hbs',
    ]);

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
