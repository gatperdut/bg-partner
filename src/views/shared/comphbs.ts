import fs, { Stats } from 'fs';
import _ from 'lodash';
import path from 'path';

export type Hbs = Record<string, string>;

export type Hbss = Record<string, Hbs>;

export class Hbsreg {
  public hbss: Hbss = {};

  constructor() {
    this.hbss.sheet = this.hbs(['views', 'sheet']);
  }

  private hbs(subdirs: string[]): Hbs {
    const filesRecord: Record<string, string[]> = {};

    this.from(filesRecord, __dirname, __dirname, subdirs);

    const hbs: Hbs = {};

    _.each(_.keys(filesRecord), (filename: string): void => {
      hbs[filename] = fs.readFileSync(path.join(__dirname, ...filesRecord[filename]), 'utf-8');
    });

    return hbs;
  }

  private from(
    filesRecord: Record<string, string[]>,
    root: string,
    dir: string,
    subdirs: string[],
  ): void {
    const files: string[] = fs.readdirSync(dir);

    _.each(files, (file: string): void => {
      const full = path.join(dir, file);

      const stats: Stats = fs.statSync(full);

      if (stats.isDirectory()) {
        this.from(filesRecord, root, full, subdirs);

        return;
      }

      if (!file.endsWith('.hbs')) {
        return;
      }

      if (!full.startsWith(path.join(__dirname, ...subdirs))) {
        return;
      }

      const relative: string = path.relative(root, full);

      const split: string[] = relative.split(path.sep);

      const filename = _.camelCase(_.last(split).split('.')[0]);

      filesRecord[filename] = split;
    });
  }
}
