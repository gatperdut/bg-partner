import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('trackerAPI', {
  eyeClick: () => ipcRenderer.send('eyeClick'),
});
