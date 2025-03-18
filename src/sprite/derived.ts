import { handlers } from '@handlers';

export class Derived {
  public state: number;

  public hpMax: number;

  public ac: number;

  public thac0: number;

  public thac0BonusRight: number;

  public thac0BonusLeft: number;

  public apr: number;

  public xp: number;

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

  public resistMagicDamage: number;

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

  public seeInvisible: boolean;

  public backstabImmunity: boolean;

  public timestopImmunity: boolean;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.state = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x0), 'UINT32');

    this.hpMax = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x4), 'INT16');

    this.ac = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x6), 'INT16');

    this.thac0 = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x10), 'INT16');

    this.thac0BonusRight = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xe4), 'INT32');

    this.thac0BonusLeft = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xe8), 'INT32');

    this.apr = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x12), 'INT16');

    this.xp = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x5c), 'UINT32');

    this.str = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x4e), 'INT16');

    this.strExc = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x50), 'INT16');

    this.dex = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x56), 'INT16');

    this.con = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x58), 'INT16');

    this.int = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x52), 'INT16');

    this.wis = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x54), 'INT16');

    this.cha = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x5a), 'INT16');

    this.resistFire = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x1e), 'INT16');

    this.resistCold = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x20), 'INT16');

    this.resistElectricity = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x22),
      'INT16',
    );

    this.resistAcid = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x24), 'INT16');

    this.resistMagic = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x26), 'INT16');

    this.resistMagicDamage = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0xbe),
      'INT16',
    );

    this.resistPoison = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xc0), 'INT16');

    this.resistSlashing = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x2c), 'INT16');

    this.resistCrushing = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x2e), 'INT16');

    this.resistPiercing = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x30), 'INT16');

    this.resistMissile = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x32), 'INT16');

    this.saveVsDeath = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x14), 'INT16');

    this.saveVsWands = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x16), 'INT16');

    this.saveVsPoly = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x18), 'INT16');

    this.saveVsBreath = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x1a), 'INT16');

    this.saveVsSpell = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x1c), 'INT16');

    this.seeInvisible = !!handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xd8), 'INT32');

    this.backstabImmunity = !!handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x284),
      'INT32',
    );

    this.timestopImmunity = !!handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x2d8),
      'INT32',
    );
  }
}
