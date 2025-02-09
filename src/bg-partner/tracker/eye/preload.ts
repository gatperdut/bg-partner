import { contextBridge, ipcRenderer } from 'electron';
import { Sprite } from '../../sprite';

contextBridge.exposeInMainWorld('eyeAPI', {
  open: (id: number): void => {
    ipcRenderer.send('sheet.open', id);
  },
  initialize: (callback: Function): Electron.IpcRenderer => {
    return ipcRenderer.on(
      'eye.initialize',
      (_event: Electron.IpcRendererEvent, value: Sprite): any => callback(value)
    );
  },
});
