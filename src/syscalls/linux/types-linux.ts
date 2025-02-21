export type IOVEC = {
  iov_base: Uint8Array | bigint;
  iov_len: number;
};
