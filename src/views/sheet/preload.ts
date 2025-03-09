import { contextBridge, ipcRenderer } from 'electron';
import {
  SheetAPIClose,
  SheetAPIMove,
  SheetAPIRunning,
  SheetAPIRunningMethod,
  SheetAPISetup,
  SheetAPISetupMethod,
  SheetAPIUpdate,
  SheetAPIUpdateMethod,
} from './renderer';

export type SheetAPIBridge = {
  setup: (callback: SheetAPISetup) => Electron.IpcRenderer;

  move: SheetAPIMove;

  close: SheetAPIClose;

  update: (callback: SheetAPIUpdate) => Electron.IpcRenderer;

  running: (callback: SheetAPIRunning) => Electron.IpcRenderer;
};

const sheetAPIBridge: SheetAPIBridge = {
  setup: (callback: SheetAPISetup): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'sheet.setup',
      (_event: Electron.IpcRendererEvent, value: SheetAPISetupMethod): void => callback(value)
    );
  },
  move: (id: number, movement: Electron.Point): void => {
    ipcRenderer.send(`sheet.move.${id}`, movement);
  },
  close: (id: number): void => {
    ipcRenderer.send(`sheet.close.${id}`);
  },
  update: (callback: SheetAPIUpdate): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'sheet.update',
      (_event: Electron.IpcRendererEvent, value: SheetAPIUpdateMethod): void => callback(value)
    );
  },
  running: (callback: SheetAPIRunning): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'sheet.running',
      (_event: Electron.IpcRendererEvent, value: SheetAPIRunningMethod): void => callback(value)
    );
  },
};

contextBridge.exposeInMainWorld('sheetAPI', sheetAPIBridge);
