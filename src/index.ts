import { execSync } from 'child_process';
import { app } from 'electron';
import os from 'os';
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

export const linux = (): boolean => {
  return os.platform() === 'linux';
};

const run = (): void => {
  execSync('ls');

  new Main().run();
};

app.on('ready', run);

app.on('window-all-closed', (): void => {
  // app.quit();
});
