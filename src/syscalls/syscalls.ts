import { SyscallsLinux } from '@syscalls/linux/syscalls-linux';
import { SyscallsWin32 } from '@syscalls/win32/syscalls-win32';

export type Syscalls = SyscallsLinux | SyscallsWin32;
