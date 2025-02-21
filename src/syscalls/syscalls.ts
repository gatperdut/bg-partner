import { SyscallsLinux } from './linux/syscalls-linux';
import { SyscallsWin32 } from './win32/syscalls-win32';

export type Syscalls = SyscallsLinux | SyscallsWin32;
