import { contextBridge, ipcRenderer } from 'electron';
import { Sprite } from '../../sprite';

contextBridge.exposeInMainWorld('trackerAPI', {
  eyeClick: (id: number): void => ipcRenderer.send('eye-click', id),
  onInitialize: (callback: Function): Electron.IpcRenderer =>
    ipcRenderer.on('initialize', (_event: Electron.IpcRendererEvent, value: Sprite): any =>
      callback(value)
    ),
});
