import { contextBridge, ipcRenderer } from 'electron';
import { SheetAPIOnUpdate, SheetAPIOnUpdateMethod, SheetAPIclose } from './renderer';

export type SheetAPIBridge = {
  close: SheetAPIclose;
  update: (callback: SheetAPIOnUpdate) => Electron.IpcRenderer;
};

const sheetAPIBridge: SheetAPIBridge = {
  close: (id: number): void => {
    ipcRenderer.send(`sheet.close.${id}`);
  },
  update: (callback: SheetAPIOnUpdate): Electron.IpcRenderer => {
    return ipcRenderer.on(
      `sheet.update`,
      (_event: Electron.IpcRendererEvent, value: SheetAPIOnUpdateMethod): void => callback(value)
    );
  },
};

contextBridge.exposeInMainWorld('sheetAPI', sheetAPIBridge);
