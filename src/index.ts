import { app, globalShortcut } from 'electron';
import { Main } from './bg-partner/main';

declare global {
  interface Window {
    electron: any;
  }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const run = (): void => {
  new Main().run();

  globalShortcut.register('CommandOrControl+A', () => {
    // Empty
  });
};

app.on('ready', run);

app.on('window-all-closed', (): void => {
  // app.quit();
});
