import { handlers } from '@handlers';
import { Main } from '@main';
import { app } from 'electron';

declare global {
  interface Window {
    electron: any;
  }
}

const run = (): void => {
  new Main().run();
};

app.on('ready', run);

app.on('window-all-closed', (): void => {
  // Prevent default.
});

app.on('before-quit', (): void => {
  handlers.shortcuts?.teardown();
});
