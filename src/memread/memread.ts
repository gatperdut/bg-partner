import { MemreadLinux } from './memread-linux';
import { MemreadWin32 } from './memread-win32';

export type Memread = MemreadLinux | MemreadWin32;
