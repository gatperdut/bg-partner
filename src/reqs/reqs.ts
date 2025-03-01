import fs from 'fs';
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
    return fs.existsSync(path.join(handlers.config.obj.path, 'chitin.key'));
  }
}
