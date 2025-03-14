import { MemreadLinux } from '@memread/memread-linux';
import { MemreadWin32 } from '@memread/memread-win32';

export type Memread = MemreadLinux | MemreadWin32;
