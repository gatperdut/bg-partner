import { execSync } from 'child_process';
import { app } from 'electron';
import os from 'os';
import { Main } from './main';

declare global {
  interface Window {
    electron: any;
  }
}

if (require('electron-squirrel-startup')) {
  app.quit();
}

export const linux = os.platform() === 'linux';

const run = (): void => {
  if (linux) {
    execSync('sudo ls');
  }

  new Main().run();
};

app.on('ready', run);

app.on('window-all-closed', (): void => {
  // Prevent default.
});
