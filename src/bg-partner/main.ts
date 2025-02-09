import 'source-map-support/register';

import koffi from 'koffi';

const lib = koffi.load('libc.so.6');

const perror = lib.func('perror', 'void', ['char*']);

export class Main {
  public run(): void {
    koffi.struct('iovec', {
      iov_base: 'void*',
      iov_len: 'unsigned int',
    });

    const process_vm_readv = lib.func('process_vm_readv', 'int', [
      'int',
      koffi.out('iovec*'),
      'unsigned long',
      'iovec*',
      'unsigned long',
      'unsigned long',
    ]);

    const local_iov = [
      {
        // iov_base: koffi.array('char', 4, 'Array'),
        iov_base: [0, 0, 0, 0],
        iov_len: 4,
      },
    ];

    // 11952513
    // 12993776

    const remote_iov = [
      {
        iov_base: 0x000000000009f410,
        iov_len: 4,
      },
    ];

    console.log(process_vm_readv(11745, local_iov, 1, remote_iov, 1, 0));
    error();
    console.log(local_iov);
    console.log(remote_iov);
  }
}

const error = () => {
  console.log(perror(null));
};
