import { handlers } from '../handlers';

export class Derived {
  public hpMax: number;

  public str: number;

  public strExc: number;

  public dex: number;

  public con: number;

  public int: number;

  public wis: number;

  public cha: number;

  public resistFire: number;

  public resistCold: number;

  public resistElectricity: number;

  public resistAcid: number;

  public resistMagic: number;

  public resistPoison: number;

  public resistSlashing: number;

  public resistCrushing: number;

  public resistPiercing: number;

  public resistMissile: number;

  public saveVsDeath: number;

  public saveVsWands: number;

  public saveVsPoly: number;

  public saveVsBreath: number;

  public saveVsSpell: number;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.hpMax = handlers.memread.memReadNumber(this.base + BigInt(0x4), 'INT16');

    this.str = handlers.memread.memReadNumber(this.base + BigInt(0x4e), 'INT16');

    this.strExc = handlers.memread.memReadNumber(this.base + BigInt(0x50), 'INT16');

    this.dex = handlers.memread.memReadNumber(this.base + BigInt(0x56), 'INT16');

    this.con = handlers.memread.memReadNumber(this.base + BigInt(0x58), 'INT16');

    this.int = handlers.memread.memReadNumber(this.base + BigInt(0x52), 'INT16');

    this.wis = handlers.memread.memReadNumber(this.base + BigInt(0x54), 'INT16');

    this.cha = handlers.memread.memReadNumber(this.base + BigInt(0x5a), 'INT16');

    this.resistFire = handlers.memread.memReadNumber(this.base + BigInt(0x1e), 'INT16');

    this.resistCold = handlers.memread.memReadNumber(this.base + BigInt(0x20), 'INT16');

    this.resistElectricity = handlers.memread.memReadNumber(this.base + BigInt(0x22), 'INT16');

    this.resistAcid = handlers.memread.memReadNumber(this.base + BigInt(0x24), 'INT16');

    this.resistMagic = handlers.memread.memReadNumber(this.base + BigInt(0x26), 'INT16');

    this.resistPoison = handlers.memread.memReadNumber(this.base + BigInt(0xc0), 'INT16');

    this.resistSlashing = handlers.memread.memReadNumber(this.base + BigInt(0x2c), 'INT16');

    this.resistCrushing = handlers.memread.memReadNumber(this.base + BigInt(0x2e), 'INT16');

    this.resistPiercing = handlers.memread.memReadNumber(this.base + BigInt(0x30), 'INT16');

    this.resistMissile = handlers.memread.memReadNumber(this.base + BigInt(0x32), 'INT16');

    this.saveVsDeath = handlers.memread.memReadNumber(this.base + BigInt(0x14), 'INT16');

    this.saveVsWands = handlers.memread.memReadNumber(this.base + BigInt(0x16), 'INT16');

    this.saveVsPoly = handlers.memread.memReadNumber(this.base + BigInt(0x18), 'INT16');

    this.saveVsBreath = handlers.memread.memReadNumber(this.base + BigInt(0x1a), 'INT16');

    this.saveVsSpell = handlers.memread.memReadNumber(this.base + BigInt(0x1c), 'INT16');
  }
}
