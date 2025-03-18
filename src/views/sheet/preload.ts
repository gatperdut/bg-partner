import {
  SheetAPIClose,
  SheetAPIMove,
  SheetAPISetup,
  SheetAPISetupMethod,
  SheetAPIUpdate,
  SheetAPIUpdated,
  SheetAPIUpdateMethod,
} from '@views/sheet/renderer';
import { contextBridge, ipcRenderer } from 'electron';

export type SheetAPIBridge = {
  setup: (callback: SheetAPISetup) => Electron.IpcRenderer;

  move: SheetAPIMove;

  close: SheetAPIClose;

  update: (callback: SheetAPIUpdate) => Electron.IpcRenderer;

  updated: SheetAPIUpdated;
};

const sheetAPIBridge: SheetAPIBridge = {
  setup: (callback: SheetAPISetup): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'sheet.setup',
      (_event: Electron.IpcRendererEvent, value: SheetAPISetupMethod): void => callback(value),
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
      (_event: Electron.IpcRendererEvent, value: SheetAPIUpdateMethod): void => callback(value),
    );
  },
  updated: (id: number, height: number): void => {
    ipcRenderer.send(`sheet.updated.${id}`, height);
  },
};

contextBridge.exposeInMainWorld('sheetAPI', sheetAPIBridge);
