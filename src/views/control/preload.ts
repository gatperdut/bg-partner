import { contextBridge, ipcRenderer } from 'electron';
import {
  ControlAPIConfigSet,
  ControlAPISetup,
  ControlAPISetupMethod,
  ControlAPIUpdate,
  ControlAPIUpdateMethod,
} from './renderer';

export type ControlAPIBridge = {
  setup: (callback: ControlAPISetup) => Electron.IpcRenderer;
  configSet: ControlAPIConfigSet;
  update: (callback: ControlAPIUpdate) => Electron.IpcRenderer;
};

const controlAPIBridge: ControlAPIBridge = {
  setup: (callback: ControlAPISetup): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'control.setup',
      (_event: Electron.IpcRendererEvent, value: ControlAPISetupMethod): void => callback(value)
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
