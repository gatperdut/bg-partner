import { contextBridge, ipcRenderer } from 'electron';
import { SheetAPIOnInitialize, SheetAPIOnInitializeMethod, SheetAPISheetClose } from './renderer';

export type SheetAPIBridge = {
  sheetClose: SheetAPISheetClose;
  initialize: (callback: SheetAPIOnInitialize) => Electron.IpcRenderer;
};

const sheetAPIBridge: SheetAPIBridge = {
  sheetClose: (id: number): void => {
    ipcRenderer.send(`sheet.close.${id}`);
  },
  initialize: (callback: SheetAPIOnInitialize): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'sheet.update',
      (_event: Electron.IpcRendererEvent, value: SheetAPIOnInitializeMethod): void =>
        callback(value)
    );
  },
};

contextBridge.exposeInMainWorld('sheetAPI', sheetAPIBridge);
