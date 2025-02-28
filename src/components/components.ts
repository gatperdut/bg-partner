import fs from 'fs';
import path from 'path';

export class Components {
  public components: Record<string, string> = {};

  constructor() {
    this.components.abilities = fs.readFileSync(
      path.join(__dirname, 'views', 'sheet', 'components', 'abilities', 'abilities.hbs'),
      'utf-8'
    );

    this.components.abilitiesGroup = fs.readFileSync(
      path.join(
        __dirname,
        'views',
        'sheet',
        'components',
        'abilities-group',
        'abilities-group.hbs'
      ),
      'utf-8'
    );
  }
}
