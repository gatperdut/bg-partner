import { ReqsLinux, ReqsLinuxObj } from '@reqs/reqs-linux';
import { ReqsWin32, ReqsWin32Obj } from '@reqs/reqs-win32';

export type Reqs = ReqsLinux | ReqsWin32;

export type ReqsObj = ReqsLinuxObj | ReqsWin32Obj;

export abstract class ReqsOs {
  // Empty
}
