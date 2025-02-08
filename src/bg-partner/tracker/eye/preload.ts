import { contextBridge, ipcRenderer } from 'electron';
import { Sprite } from '../../sprite';

contextBridge.exposeInMainWorld('eyeAPI', {
  sheetOpen: (id: number): void => {
    ipcRenderer.send('sheet.open', id);
  },
  onInitialize: (callback: Function): Electron.IpcRenderer => {
    return ipcRenderer.on('initialize', (_event: Electron.IpcRendererEvent, value: Sprite): any =>
      callback(value)
    );
  },
});
