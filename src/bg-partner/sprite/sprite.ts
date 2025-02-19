import { TargetProcess } from '../mem/mem-common';
import { Memread } from '../memread/memread';
import { Derived, derivedEmpty, derivedFill } from './derived';

export class Sprite {
  // Basic
  public type: number;

  public canBeSeen: number;

  public id: number;

  public gameAreaPtr: number;

  public hp: number;

  public viewportX: number;

  public viewportY: number;

  public scrollX: number;

  public scrollY: number;

  public relativeX: number;

  public relativeY: number;

  public x: number;

  public y: number;

  public name: string;

  public resref: string;

  // Advanced
  public enemyAlly: number;

  public race: number;

  // Derived
  public derived: Derived = derivedEmpty();
  public derivedBonus: Derived = derivedEmpty();
  public derivedTemp: Derived = derivedEmpty();

  constructor(
    public targetProcess: TargetProcess,
    public basePtr: number,
    public memread: Memread
  ) {
    this.basic();
  }

  public get invalid(): boolean {
    return (
      !this.id ||
      this.type !== 0x31 ||
      !this.hp ||
      !this.gameAreaPtr ||
      this.x < 0 ||
      this.y < 0 ||
      !this.name ||
      !this.resref ||
      !this.canBeSeen
    );
  }

  public basic(): void {
    this.type = this.memread.memReadNumber(this.targetProcess, BigInt(this.basePtr + 0x8), 'UINT8');

    this.gameAreaPtr = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.basePtr + 0x18),
      'PTR'
    );

    this.hp = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.basePtr + 0x560 + 0x1c),
      'INT16'
    );

    this.canBeSeen = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.basePtr + 0x4c),
      'INT16'
    );

    this.resref = this.memread
      .memReadString(this.targetProcess, BigInt(this.basePtr + 0x540))
      .replace(/\*/g, '');

    this.id = this.memread.memReadNumber(this.targetProcess, BigInt(this.basePtr + 0x48), 'UINT32');

    this.x = this.memread.memReadNumber(this.targetProcess, BigInt(this.basePtr + 0xc), 'UINT32');

    this.y = this.memread.memReadNumber(this.targetProcess, BigInt(this.basePtr + 0x10), 'UINT32');

    const namePtr = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.basePtr + 0x3928),
      'PTR'
    );

    this.name = this.memread.memReadString(this.targetProcess, BigInt(namePtr));
    console.log(this.name);
    this.viewportX = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.gameAreaPtr + 0x5c8 + 0x78 + 0x8),
      'INT32'
    );
    this.viewportY = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.gameAreaPtr + 0x5c8 + 0x78 + 0x8 + 0x4),
      'INT32'
    );

    this.scrollX = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.gameAreaPtr + 0x5c8 + 0xc0),
      'INT32'
    );
    this.scrollY = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.gameAreaPtr + 0x5c8 + 0xc0 + 0x4),
      'INT32'
    );

    this.relativeX = this.x - this.scrollX;
    this.relativeY = this.y - this.scrollY;
  }

  public advanced(): void {
    this.enemyAlly = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.basePtr + 0x38),
      'BYTE'
    );

    this.race = this.memread.memReadNumber(
      this.targetProcess,
      BigInt(this.basePtr + 0x30 + 0xa),
      'BYTE'
    );

    derivedFill(this.memread, this.targetProcess, this.basePtr + 0x1120, this.derived);

    derivedFill(this.memread, this.targetProcess, this.basePtr + 0x2a70, this.derivedBonus);

    derivedFill(this.memread, this.targetProcess, this.basePtr + 0x1dc8, this.derivedTemp);
  }
}
