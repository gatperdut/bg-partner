import { contextBridge, ipcRenderer } from 'electron';
import {
  ControlAPIConfig,
  ControlAPIConfigMethod,
  ControlAPIConfigSet,
  ControlAPIUpdate,
  ControlAPIUpdateMethod,
} from './renderer';

export type ControlAPIBridge = {
  config: (callback: ControlAPIConfig) => Electron.IpcRenderer;
  configSet: ControlAPIConfigSet;
  update: (callback: ControlAPIUpdate) => Electron.IpcRenderer;
};

const controlAPIBridge: ControlAPIBridge = {
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
