import { app } from 'electron';
import * as fs from 'fs';
import Joi, { ObjectSchema } from 'joi';
import * as path from 'path';
import { linux } from '../index';

export type ConfigObj = {
  exe: string;

  display: number;

  ms: number;
};

export class Config {
  private schema: ObjectSchema<ConfigObj> = Joi.object<ConfigObj>({
    exe: Joi.string().pattern(new RegExp('^[a-zA-Z0-9.]+$')).min(1),
    display: Joi.number().integer().min(0).allow(null),
    ms: Joi.number().integer().min(100),
  });

  private default: ConfigObj = {
    exe: linux ? 'BaldursGateII' : 'Baldur.exe',
    display: null,
    ms: 300,
  };

  public obj: ConfigObj;

  constructor() {
    const configObj: ConfigObj = this.fileread();

    if (this.schema.validate(configObj).error) {
      console.log('Configuration file looks invalid. Will revert to defaults.');

      this.obj = this.default;

      return;
    }

    this.obj = { ...this.default, ...configObj };

    this.filewrite(this.obj);

    console.log('Configuration:', this.stringify(this.obj));
  }

  private get filePath(): string {
    const exePath: string = app.getPath('exe');

    const dirPath: string = path.dirname(exePath);

    return path.join(dirPath, 'bg-partner.ini');
  }

  private fileread(): ConfigObj {
    const filePath: string = this.filePath;

    if (!fs.existsSync(filePath)) {
      console.log('Configuration file not found. Will create one with defaults.');

      this.filewrite(this.default);

      return this.default;
    }

    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.log('Configuration file could not be parsed as JSON. Will revert to defaults.');
      return this.default;
    }
  }

  private filewrite(configObj: ConfigObj): void {
    fs.writeFileSync(this.filePath, this.stringify(configObj), 'utf-8');
  }

  private stringify(configObj: ConfigObj): string {
    return JSON.stringify(configObj, null, 2);
  }
}
