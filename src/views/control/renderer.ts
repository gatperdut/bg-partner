import { ConfigObj } from '../../config/config';
import { ReqsObj } from '../../reqs/reqs';
import './control.scss';

// control.reqs
export type ControlAPIReqsParams = { reqsObj: ReqsObj };

export type ControlAPIReqsMethod = (params: ControlAPIReqsParams) => void;

export type ControlAPIReqs = (data: ControlAPIReqsMethod) => void;

// control.config
export type ControlAPIConfigParams = { configObj: ConfigObj };

export type ControlAPIConfigMethod = (params: ControlAPIConfigParams) => void;

export type ControlAPIConfig = (data: ControlAPIConfigMethod) => void;

// control.configSet
export type ControlAPIConfigSet = (height: number) => void;

// control.update
export type ControlAPIUpdateParams = { alive: boolean };

export type ControlAPIUpdateMethod = (params: ControlAPIUpdateParams) => void;

export type ControlAPIUpdate = (data: ControlAPIUpdateMethod) => void;

export type ControlAPI = {
  reqs: ControlAPIReqs;
  config: ControlAPIConfig;
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
    window.controlAPI.reqs((params: ControlAPIReqsParams): void => {
      this.reqs(params.reqsObj);
    });

    window.controlAPI.update((params: ControlAPIUpdateParams): void => {
      this.updateAlive(params.alive);
    });

    window.controlAPI.config((params: ControlAPIConfigParams): void => {
      this.updateConfig(params.configObj);

      window.controlAPI.configSet(document.getElementById('wrapper').clientHeight + 20);
    });
  }

  private reqs(reqsObj: ReqsObj): void {
    document.getElementById('reqs-aslr').textContent = reqsObj.aslr
      ? '✅ ASLR is disabled.'
      : '❌ ASLR is enabled.';

    document.getElementById('reqs-ptrace').textContent = reqsObj.ptrace
      ? '✅ ptrace_scope is disabled.'
      : '❌ ptrace_scope is enabled.';
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

  private updateConfig(configObj: ConfigObj): void {
    document.getElementById('config').textContent = JSON.stringify(configObj, null, 2);
  }
}

new ControlRenderer();
