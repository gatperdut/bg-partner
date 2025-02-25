import { contextBridge, ipcRenderer } from 'electron';
import {
  ControlAPIConfig,
  ControlAPIConfigMethod,
  ControlAPIConfigSet,
  ControlAPIReqs,
  ControlAPIReqsMethod,
  ControlAPIUpdate,
  ControlAPIUpdateMethod,
} from './renderer';

export type ControlAPIBridge = {
  reqs: (callback: ControlAPIReqs) => Electron.IpcRenderer;
  config: (callback: ControlAPIConfig) => Electron.IpcRenderer;
  configSet: ControlAPIConfigSet;
  update: (callback: ControlAPIUpdate) => Electron.IpcRenderer;
};

const controlAPIBridge: ControlAPIBridge = {
  reqs: (callback: ControlAPIReqs): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'control.reqs',
      (_event: Electron.IpcRendererEvent, value: ControlAPIReqsMethod): void => callback(value)
    );
  },
  config: (callback: ControlAPIConfig): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'control.config',
      (_event: Electron.IpcRendererEvent, value: ControlAPIConfigMethod): void => callback(value)
    );
  },
  configSet: (height: number): void => {
    ipcRenderer.send('control.configSet', height);
  },
  update: (callback: ControlAPIUpdate): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'control.update',
      (_event: Electron.IpcRendererEvent, value: ControlAPIUpdateMethod): void => callback(value)
    );
  },
};

contextBridge.exposeInMainWorld('controlAPI', controlAPIBridge);
