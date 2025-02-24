import { ConfigObj } from '../../config/config';
import './control.scss';

export type ControlAPIConfigParams = { configObj: ConfigObj };

export type ControlAPIConfigMethod = (params: ControlAPIConfigParams) => void;

export type ControlAPIConfig = (data: ControlAPIConfigMethod) => void;

export type ControlAPIConfigSet = (height: number) => void;

export type ControlAPIUpdateParams = { alive: boolean };

export type ControlAPIUpdateMethod = (params: ControlAPIUpdateParams) => void;

export type ControlAPIUpdate = (data: ControlAPIUpdateMethod) => void;

export type ControlAPI = {
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
    window.controlAPI.update((params: ControlAPIUpdateParams): void => {
      this.updateAlive(params.alive);
    });

    window.controlAPI.config((params: ControlAPIConfigParams): void => {
      this.updateConfig(params.configObj);

      window.controlAPI.configSet(document.getElementById('wrapper').clientHeight + 20);
    });
  }

  private updateAlive(alive: boolean): void {
    if (this.alivePrev === alive) {
      return;
    }

    document.getElementById('alive').textContent = alive
      ? '✅ Process found'
      : '❌ Process not found';

    this.alivePrev = alive;
  }

  private updateConfig(configObj: ConfigObj): void {
    document.getElementById('config').textContent = JSON.stringify(configObj, null, 2);
  }
}

new ControlRenderer();
