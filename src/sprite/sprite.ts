import { handlers } from '../handlers';
import { linux } from '../index';
import { Memread } from '../memread/memread';
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

  constructor(public basePtr: bigint, public memread: Memread) {
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
    this.type = this.memread.memReadNumber(this.basePtr + BigInt(0x8), 'UINT8');

    this.gameAreaAddr = this.memread.memReadBigint(this.basePtr + BigInt(0x18), 'ADDR');

    this.hp = this.memread.memReadNumber(this.basePtr + BigInt(0x560 + 0x1c), 'INT16');

    this.canBeSeen = this.memread.memReadNumber(this.basePtr + BigInt(0x4c), 'INT16');

    this.resref = this.memread.memReadString(this.basePtr + BigInt(0x540)).replace(/\*/g, '');

    this.id = this.memread.memReadNumber(this.basePtr + BigInt(0x48), 'UINT32');

    this.pos.x = this.memread.memReadNumber(
      this.basePtr + BigInt(0xc),
      linux ? 'UINT16' : 'UINT32'
    );

    this.pos.y = this.memread.memReadNumber(
      this.basePtr + BigInt(0x10),
      linux ? 'UINT16' : 'UINT32'
    );

    const nameAddr: bigint = this.memread.memReadBigint(
      this.basePtr + BigInt(linux ? 0x3910 : 0x3928),
      'ADDR'
    );

    this.name = this.memread.memReadString(BigInt(nameAddr));

    this.viewport.width = this.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0x78 + 0x8),
      linux ? 'INT16' : 'INT32'
    );

    this.viewport.height = this.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0x78 + 0x8 + 0x4),
      linux ? 'INT16' : 'INT32'
    );

    this.scroll.x = this.memread.memReadNumber(this.gameAreaAddr + BigInt(0x5c8 + 0xc0), 'INT32');

    this.scroll.y = this.memread.memReadNumber(
      this.gameAreaAddr + BigInt(0x5c8 + 0xc0 + 0x4),
      'INT32'
    );

    this.relative.x = this.pos.x - this.scroll.x;

    this.relative.y = this.pos.y - this.scroll.y;
  }

  public advanced(): void {
    this.enemyAlly = this.memread.memReadNumber(this.basePtr + BigInt(0x38), 'BYTE');

    this.race = this.memread.memReadNumber(this.basePtr + BigInt(0x30 + 0xa), 'BYTE');

    derivedFill(this.memread, this.basePtr + BigInt(0x1120), this.derived);

    derivedFill(this.memread, this.basePtr + BigInt(0x2a70), this.derivedBonus);

    derivedFill(this.memread, this.basePtr + BigInt(0x1dc8), this.derivedTemp);
  }

  public get screen(): Electron.Point {
    return {
      x: Math.round(
        handlers.window.windowLeft +
          (this.relative.x / this.viewport.width) * handlers.window.window.width
      ),
      y: Math.round(
        handlers.window.windowTop +
          (this.relative.y / this.viewport.height) * handlers.window.window.height
      ),
    };
  }
}
