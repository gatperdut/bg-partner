import { app } from 'electron';
import * as fs from 'fs';
import Joi, { ObjectSchema } from 'joi';
import * as path from 'path';
import { linux } from '../index';

export type ConfigObj = {
  exe: string;
  ms: number;
};

export class Config {
  private schema: ObjectSchema<ConfigObj> = Joi.object<ConfigObj>({
    exe: Joi.string().pattern(new RegExp('^[a-zA-Z0-9.]$')).required().min(1),
    ms: Joi.number().integer().required().min(0),
  });

  private default: ConfigObj = {
    exe: linux ? 'BaldursGateII' : 'Baldur.exe',
    ms: 300,
  };

  public obj: ConfigObj;

  constructor() {
    const configObj: ConfigObj = this.fileread();

    if (this.schema.validate(configObj).error) {
      console.log('Configuration file does not look valid, using defaults.');

      this.obj = this.default;

      return;
    }

    this.obj = configObj;
  }

  private filePath(): string {
    const exePath: string = app.getPath('exe');

    const dirPath: string = path.dirname(exePath);

    return path.join(dirPath, 'bg-partner.ini');
  }

  private fileread(): ConfigObj {
    try {
      const filePath: string = this.filePath();

      if (!fs.existsSync(filePath)) {
        console.log('Configuration file not found, will generate one with defaults.');

        this.filewrite(filePath);

        return this.default;
      }

      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.log('Configuration file could not be parsed as JSON, using defaults.');
      return this.default;
    }
  }

  private filewrite(filePath: string): void {
    fs.writeFileSync(filePath, JSON.stringify(this.default, null, 2), 'utf-8');
  }
}
