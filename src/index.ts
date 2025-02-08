import { app } from 'electron';
import { Main } from './bg-partner/main';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const run = (): void => {
  new Main().run();
};

app.on('ready', run);

// app.on('window-all-closed', (): void => {
//   app.quit();
// });
