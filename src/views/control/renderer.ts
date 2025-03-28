import { ConfigObj } from '@config/config';
import { ReqsObj } from '@reqs/reqs';
import { ReqsLinuxObj } from '@reqs/reqs-linux';
import '@views/control/control.scss';

// control.setup
export type ControlAPISetupParams = { linux: boolean; reqsObj: ReqsObj; configObj: ConfigObj };

export type ControlAPISetupMethod = (params: ControlAPISetupParams) => void;

export type ControlAPISetup = (data: ControlAPISetupMethod) => void;

// control.configSet
export type ControlAPIConfigSet = (height: number) => void;

// control.update
export type ControlAPIUpdateParams = { linux: boolean; alive: boolean; reqsObj: ReqsObj };

export type ControlAPIUpdateMethod = (params: ControlAPIUpdateParams) => void;

export type ControlAPIUpdate = (data: ControlAPIUpdateMethod) => void;

export type ControlAPI = {
  setup: ControlAPISetup;
  configSet: ControlAPIConfigSet;
  update: ControlAPIUpdate;
};

declare global {
  interface Window {
    controlAPI: ControlAPI;
  }
}

class ControlRenderer {
  private alivePrev: boolean = null;

  constructor() {
    window.controlAPI.setup((params: ControlAPISetupParams): void => {
      this.reqs(params.linux, params.reqsObj);

      this.updateConfig(params.configObj);

      window.controlAPI.configSet(document.getElementById('wrapper').clientHeight);
    });

    window.controlAPI.update((params: ControlAPIUpdateParams): void => {
      this.updateAlive(params.alive);

      this.reqs(params.linux, params.reqsObj);
    });
  }

  private updateAlive(alive: boolean): void {
    if (this.alivePrev === alive) {
      return;
    }

    document.getElementById('alive').textContent = alive
      ? '✅ Process found.'
      : '❌ Process not found.';

    this.alivePrev = alive;
  }

  private reqs(linux: boolean, reqsObj: ReqsObj): void {
    if (linux) {
      document.getElementById('reqs-aslr').textContent = (reqsObj as ReqsLinuxObj).aslr
        ? '✅ ASLR is disabled.'
        : '❌ ASLR is enabled.';

      document.getElementById('reqs-ptrace').textContent = (reqsObj as ReqsLinuxObj).ptrace
        ? '✅ ptrace_scope is disabled.'
        : '❌ ptrace_scope is enabled.';

      document.getElementById('reqs-apparmor').textContent = (reqsObj as ReqsLinuxObj).ptrace
        ? '✅ apparmor restriction is disabled.'
        : '❌ apparmor restriction is enabled.';
    }
  }

  private updateConfig(configObj: ConfigObj): void {
    document.getElementById('config').textContent = JSON.stringify(configObj, null, 2);
  }
}

new ControlRenderer();
