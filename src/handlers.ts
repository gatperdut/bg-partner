import { Chitin } from './chitin/chitin';
import { Tlk } from './chitin/res/impl/res-tlk';
import { Components } from './components/components';
import { Config } from './config/config';
import { Entities } from './entities/entities';
import { Memread } from './memread/memread';
import { MemreadLinux } from './memread/memread-linux';
import { MemreadWin32 } from './memread/memread-win32';
import { Memscan } from './memscan/memscan';
import { MemscanLinux } from './memscan/memscan-linux';
import { MemscanWin32 } from './memscan/memscan-win32';
import { Reqs } from './reqs/reqs';
import { ReqsLinux } from './reqs/reqs-linux';
import { ReqsWin32 } from './reqs/reqs-win32';
import { Shortcuts } from './shortcuts/shortcuts';
import { ShortcutsLinux } from './shortcuts/shortcuts-linux';
import { ShortcutsWin32 } from './shortcuts/shortcuts-win32';
import { SyscallsLinux } from './syscalls/linux/syscalls-linux';
import { Syscalls } from './syscalls/syscalls';
import { SyscallsWin32 } from './syscalls/win32/syscalls-win32';
import { Control } from './views/control/control';
import { Window } from './window/window';
import { WindowLinux } from './window/window-linux';
import { WindowWin32 } from './window/window-win32';

export type Handlers = {
  reqs: Reqs;
  config: Config;
  tlk: Tlk;
  chitin: Chitin;
  syscalls: Syscalls;
  memread: Memread;
  memscan: Memscan;
  window: Window;
  entities: Entities;
  shortcuts: Shortcuts;
  control: Control;
  components: Components;
};

export const handlers: Handlers = {
  reqs: null,
  config: null,
  tlk: null,
  chitin: null,
  syscalls: null,
  memread: null,
  memscan: null,
  window: null,
  entities: null,
  shortcuts: null,
  control: null,
  components: null,
};

// TODO add the missing ones? and maybe use them?

export const reqsLinux = (): ReqsLinux => {
  return handlers.reqs as ReqsLinux;
};

export const reqsWin32 = (): ReqsWin32 => {
  return handlers.reqs as ReqsWin32;
};

export const config = (): Config => {
  return handlers.config;
};

export const syscallsLinux = (): SyscallsLinux => {
  return handlers.syscalls as SyscallsLinux;
};

export const syscallsWin32 = (): SyscallsWin32 => {
  return handlers.syscalls as SyscallsWin32;
};

export const memreadLinux = (): MemreadLinux => {
  return handlers.memread as MemreadLinux;
};

export const memreadWin32 = (): MemreadWin32 => {
  return handlers.memread as MemreadWin32;
};

export const memscanLinux = (): MemscanLinux => {
  return handlers.memscan as MemscanLinux;
};

export const memscanWin32 = (): MemscanWin32 => {
  return handlers.memscan as MemscanWin32;
};

export const windowLinux = (): WindowLinux => {
  return handlers.window as WindowLinux;
};

export const windowWin32 = (): WindowWin32 => {
  return handlers.window as WindowWin32;
};

export const shortcutsLinux = (): ShortcutsLinux => {
  return handlers.shortcuts as ShortcutsLinux;
};

export const shortcutsWin32 = (): ShortcutsWin32 => {
  return handlers.shortcuts as ShortcutsWin32;
};
