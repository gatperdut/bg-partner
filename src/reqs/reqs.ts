import fs from 'fs';
import path from 'path';
import { handlers } from '../handlers';
import { ReqsLinux, ReqsLinuxObj } from './reqs-linux';
import { ReqsWin32, ReqsWin32Obj } from './reqs-win32';

export type Reqs = ReqsLinux | ReqsWin32;

export type ReqsObj = ReqsLinuxObj | ReqsWin32Obj;

export type ReqsOsObj = {
  path: boolean;
};

export abstract class ReqsOs {
  public pathCheck(): boolean {
    // TODO could check for the individual files that are needed? chitin.key in particular is unlikely to be used.
    return fs.existsSync(path.join(handlers.config.obj.path, 'chitin.key'));
  }
}
