import { handlers } from '../handlers';
import { linux } from '../index';
import { Derived, derivedEmpty, derivedFill } from './derived';

export class Sprite {
  // Basic
  public type: number;

  public canBeSeen: number;

  public id: number;

  public gameAreaAddr: bigint;

  public hp: number;

  public viewport: Electron.Size = { width: null, height: null };

  public scroll: Electron.Point = { x: null, y: null };

  public relative: Electron.Point = { x: null, y: null };

  public pos: Electron.Point = { x: null, y: null };

  public name: string;

  public resref: string;

  // Advanced
  public enemyAlly: number;

  public race: number;

  // Derived
  public derived: Derived = derivedEmpty();
  public derivedBonus: Derived = derivedEmpty();
  public derivedTemp: Derived = derivedEmpty();

  constructor(public basePtr: bigint) {
    this.basic();
  }

  public get invalid(): boolean {
    return (
      !this.id ||
      this.type !== 0x31 ||
      !this.hp ||
      !this.gameAreaAddr ||
      this.pos.x < 0 ||
      this.pos.y < 0 ||
      !this.name ||
      !this.resref ||
      !this.canBeSeen
    );
  }

  public basic(): void {
    this.type = handlers.memread.memReadNumber(this.basePtr + BigInt(0x8), 'UINT8');

    this.gameAreaAddr = handlers.memread.memReadBigint(this.basePtr + BigInt(0x18), 'ADDR');

    this.hp = handlers.memread.memReadNumber(this.basePtr + BigInt(0x560 + 0x1c), 'INT16');

    this.canBeSeen = handlers.memread.memReadNumber(this.basePtr + BigInt(0x4c), 'INT16');

    this.resref = handlers.memread.memReadString(this.basePtr + BigInt(0x540)).replace(/\*/g, '');

    this.id = handlers.memread.memReadNumber(this.basePtr + BigInt(0x48), 'UINT32');

    this.pos.x = handlers.memread.memReadNumber(
      this.basePtr + BigInt(0xc),
      linux ? 'UINT16' : 'UINT32'
    );

    this.pos.y = handlers.memread.memReadNumber(
      this.basePtr + BigInt(0x10),
      linux ? 'UINT16' : 'UINT32'
    );

    const nameAddr: bigint = handlers.memread.memReadBigint(
      this.basePtr + BigInt(linux ? 0x3910 : 0x3928),
      'ADDR'
    );

    this.name = handlers.memread.memReadString(BigInt(nameAddr));

    this.viewport.width = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0x78 + 0x8),
      linux ? 'INT16' : 'INT32'
    );

    this.viewport.height = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0x78 + 0x8 + 0x4),
      linux ? 'INT16' : 'INT32'
    );

    this.scroll.x = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0xc0),
      'INT32'
    );

    this.scroll.y = handlers.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0xc0 + 0x4),
      'INT32'
    );

    this.relative.x = this.pos.x - this.scroll.x;

    this.relative.y = this.pos.y - this.scroll.y;
  }

  public advanced(): void {
    this.enemyAlly = handlers.memread.memReadNumber(this.basePtr + BigInt(0x38), 'BYTE');

    this.race = handlers.memread.memReadNumber(this.basePtr + BigInt(0x30 + 0xa), 'BYTE');

    derivedFill(handlers.memread, this.basePtr + BigInt(0x1120), this.derived);

    derivedFill(handlers.memread, this.basePtr + BigInt(0x2a70), this.derivedBonus);

    derivedFill(handlers.memread, this.basePtr + BigInt(0x1dc8), this.derivedTemp);
  }

  public get screen(): Electron.Point {
    return {
      x: Math.round(
        handlers.window.window.x +
          (this.relative.x / this.viewport.width) * handlers.window.window.width
      ),
      y: Math.round(
        handlers.window.window.y +
          (this.relative.y / this.viewport.height) * handlers.window.window.height
      ),
    };
  }
}
