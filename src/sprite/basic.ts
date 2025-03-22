import { handlers } from '@handlers';

export class Basic {
  public type: number;

  public canBeSeen: number;

  public id: number;

  public gameAreaAddr: bigint;

  public infGameAddr: bigint;

  public hp: number;

  public viewport: Electron.Size = { width: null, height: null };

  public scroll: Electron.Point = { x: null, y: null };

  public relative: Electron.Point = { x: null, y: null };

  public pos: Electron.Point = { x: null, y: null };

  public name: string;

  public resref: string;

  constructor(private base: bigint) {
    this.run();
  }

  public run(): void {
    this.type = handlers.memread.memReadNumber(this.base + BigInt(0x8), 'UINT8');

    this.gameAreaAddr = handlers.memread.memReadBigint(this.base + BigInt(0x18), 'ADDR');

    this.infGameAddr = handlers.memread.memReadBigint(this.gameAreaAddr + BigInt(0x228), 'ADDR');

    this.hp = handlers.memread.memReadNumber(this.base + BigInt(0x560 + 0x1c), 'INT16');

    this.canBeSeen = handlers.memread.memReadNumber(this.base + BigInt(0x4c), 'INT16');

    this.resref = handlers.memread.memReadString(this.base + BigInt(0x540), 8).replace(/\*/g, '');

    this.id = handlers.memread.memReadNumber(this.base + BigInt(0x48), 'UINT32');

    this.pos.x = handlers.memread.memReadNumber(
      this.base + BigInt(0xc),
      handlers.linux ? 'UINT16' : 'UINT32',
    );

    this.pos.y = handlers.memread.memReadNumber(
      this.base + BigInt(0x10),
      handlers.linux ? 'UINT16' : 'UINT32',
    );

    const nameAddr: bigint = handlers.memread.memReadBigint(
      this.base + BigInt(0x3928 - (handlers.linux ? 0x18 : 0x0)),
      'ADDR',
    );

    this.name = handlers.memread.memReadString(BigInt(nameAddr), Infinity);

    this.viewport.width = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0x78 + 0x8),
      handlers.linux ? 'INT16' : 'INT32',
    );

    this.viewport.height = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0x78 + 0x8 + 0x4),
      handlers.linux ? 'INT16' : 'INT32',
    );

    this.scroll.x = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0xc0),
      'INT32',
    );

    this.scroll.y = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0xc0 + 0x4),
      'INT32',
    );

    this.relative.x = this.pos.x - this.scroll.x;

    this.relative.y = this.pos.y - this.scroll.y;
  }
}
