import { contextBridge, ipcRenderer } from 'electron';
import { SheetAPIClose, SheetAPIMove, SheetAPIUpdate, SheetAPIUpdateMethod } from './renderer';

export type SheetAPIBridge = {
  move: SheetAPIMove;

  close: SheetAPIClose;

  update: (callback: SheetAPIUpdate) => Electron.IpcRenderer;
};

const sheetAPIBridge: SheetAPIBridge = {
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
};

contextBridge.exposeInMainWorld('sheetAPI', sheetAPIBridge);
