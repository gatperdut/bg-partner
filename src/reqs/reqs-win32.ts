import { ReqsOs, ReqsOsObj } from './reqs';

export type ReqsWin32Obj = ReqsOsObj & {
  // Empty
};

export class ReqsWin32 extends ReqsOs {
  public obj: ReqsWin32Obj = {
    path: null,
  };

  constructor() {
    super();
  }

  public run(): void {
    // path
    this.obj.path = this.pathCheck();
  }

  public valid(): boolean {
    return this.obj.path;
  }
}
