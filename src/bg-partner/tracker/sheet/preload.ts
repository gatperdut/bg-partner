import { contextBridge, ipcRenderer } from 'electron';
import { Sprite } from '../../sprite';

contextBridge.exposeInMainWorld('sheetAPI', {
  sheetClose: (id: number): void => {
    ipcRenderer.send('sheet.close', id);
  },
  onInitialize: (callback: Function): Electron.IpcRenderer => {
    return ipcRenderer.on('initialize', (_event: Electron.IpcRendererEvent, value: Sprite): any =>
      callback(value)
    );
  },
});
