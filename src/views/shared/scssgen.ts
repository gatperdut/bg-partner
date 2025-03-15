import fs, { Stats } from 'fs';
import _ from 'lodash';
import path from 'path';

const gen = (dir: string): void => {
  const output: string[] = ['// Auto-generated file.'];

  from(output, dir, dir);

  fs.writeFileSync(path.join(dir, 'index.scss'), output.join('\n\n'));
};

const from = (output: string[], root: string, dir: string): void => {
  const files: string[] = fs.readdirSync(dir);

  _.each(files, (file: string): void => {
    const full = path.join(dir, file);

    const stats: Stats = fs.statSync(full);

    if (stats.isDirectory()) {
      from(output, root, full);

      return;
    }

    if (!file.endsWith('.scss')) {
      return;
    }

    if (full === path.join(root, 'index.scss')) {
      return;
    }

    const relative: string = path.relative(path.join(root), full).replace(/\\/g, '/');

    output.push(`@use '${relative.slice(0, -5)}';`);
  });
};

gen(path.join(__dirname, '..', 'sheet', 'components'));
