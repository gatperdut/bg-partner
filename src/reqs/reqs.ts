import fs from 'fs';
import os from 'os';
import path from 'path';
import { handlers } from '../handlers';
import { ReqsLinux, ReqsLinuxObj } from './reqs-linux';

export type Reqs = ReqsLinux;

export type ReqsObj = ReqsLinuxObj;

export type ReqsOsObj = {
  path: boolean;
};

export abstract class ReqsOs {
  public pathCheck(): boolean {
    const configPath: string = handlers.config.obj.path;

    const configPathExpanded: string = configPath.startsWith('~')
      ? path.join(os.homedir(), configPath.slice(1))
      : configPath;

    return fs.existsSync(path.join(configPathExpanded, 'chitin.key'));
  }
}
