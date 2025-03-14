import { handlers } from '@handlers';
import { app, dialog } from 'electron';
import fs from 'fs';
import Joi from 'joi';
import _ from 'lodash';
import os from 'os';
import path from 'path';

export type ConfigObj = {
  exe: string;

  path: string;

  locale: string;

  display: number;

  ms: number;

  accelBorderless: string;

  accelSheet: string;

  accelCloseAll: string;
};

export type ConfigObjKey = keyof ConfigObj;

export class Config {
  private exePattern: RegExp = /^[a-zA-Z0-9.]+$/;

  private pathPatternLinux: RegExp = /^\/(?:[a-zA-Z0-9._-]+\/?)*$/;

  private pathPatternWin32: RegExp = /^(~|[a-zA-Z]:|\\\\[^<>:"|?*\n]+)(\\[^<>:"|?*\n]+)*\\?$/;

  private localePattern: RegExp = /^(de_DE|en_US|es_ES|fr_FR|it_IT|ko_KR|pl_PL|ru_RU|zh_CN)$/;

  private accelPattern: RegExp =
    /^(?:(?:CommandOrControl|CmdOrCtrl|Control|Ctrl|Alt|AltGr|Shift|Super))\+[A-Za-z0-9]+$/;

  private schema: Joi.ObjectSchema<ConfigObj> = Joi.object<ConfigObj>({
    exe: Joi.string().pattern(this.exePattern).min(1),
    path: Joi.string()
      .pattern(handlers.linux ? this.pathPatternLinux : this.pathPatternWin32)
      .min(1),
    locale: Joi.string().pattern(this.localePattern).min(5).max(5),
    display: Joi.number().integer().min(0).allow(null),
    ms: Joi.number().integer().min(100),
    accelBorderless: Joi.string().pattern(this.accelPattern).min(1),
    accelSheet: Joi.string().pattern(this.accelPattern).min(1),
    accelCloseAll: Joi.string().pattern(this.accelPattern).min(1),
  });

  private default: ConfigObj = {
    exe: handlers.linux ? 'BaldursGateII' : 'Baldur.exe',
    path: null,
    locale: 'en_US',
    display: null,
    ms: 300,
    accelBorderless: 'CommandOrControl+Q',
    accelSheet: 'CommandOrControl+A',
    accelCloseAll: 'CommandOrControl+X',
  };

  public obj: ConfigObj;

  public quitting: boolean;

  constructor() {
    const configObj: ConfigObj = this.fileread();

    if (this.quitting) {
      return;
    }

    const errors: Joi.ValidationError = this.schema.validate(configObj).error;

    if (errors) {
      _.each(errors.details, (error: Joi.ValidationErrorItem): void => {
        const field: ConfigObjKey = error.path[0] as ConfigObjKey;

        console.log(`Configuration file "${field}" is invalid. Will revert to default.`);

        this.defaultField(configObj, field);
      });
    }

    this.obj = { ...this.default, ...configObj };

    this.filewrite(this.obj);

    console.log(this.stringify(this.obj));

    if (!fs.existsSync(path.join(this.obj.path, 'lang', this.obj.locale, 'dialog.tlk'))) {
      this.quit(
        'Cannot find dialog.tlk',
        'Check your configuration fields "path" and "locale", then try again.',
      );

      return;
    }

    if (!fs.existsSync(path.join(this.obj.path, 'chitin.key'))) {
      this.quit('Cannot find dialog.tlk', 'Check your configuration field "path", then try again.');
    }
  }

  private defaultField<K extends ConfigObjKey>(configObj: ConfigObj, field: K) {
    if (field === 'path') {
      configObj.path = os.homedir();
    } else {
      configObj[field] = this.default[field];
    }
  }

  private get filePath(): string {
    const exePath: string = app.getPath('exe');

    const dirPath: string = path.dirname(exePath);

    return path.join(dirPath, 'bg-partner.json');
  }

  private fileread(): ConfigObj {
    const filePath: string = this.filePath;

    if (!fs.existsSync(filePath)) {
      console.log('Configuration file not found. Will create one with defaults and quit.');

      this.filewrite(this.default);

      this.quit(
        'bg-partner.json created',
        'Configuration file created, will quit now. Edit and relaunch.',
      );

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

  private quit(title: string, message: string): void {
    dialog
      .showMessageBox({
        type: 'none',
        title: title,
        message: message,
        buttons: ['OK'],
      })
      .then((): void => {
        app.quit();
      });

    this.quitting = true;
  }
}
