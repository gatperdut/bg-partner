import { handlers } from '@handlers';
import { WeapprofKey } from '@tables/weapprof';

export class Derived {
  public state: number;

  public hpMax: number;

  public hpMin: boolean;

  public ac: number;

  public thac0: number;

  public thac0BonusRight: number;

  public thac0BonusLeft: number;

  public apr: number;

  public xp: number;

  public luck: number;

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

  public drainImmunity: boolean;

  public turnUndeadImmunity: boolean;

  public spellLevelImmunity: number = 0;

  public castingTimeMod: number;

  public profs: Record<WeapprofKey, number> = {
    bastardSword: null,
    longsword: null,
    shortsword: null,
    axe: null,
    twoHandedSword: null,
    katana: null,
    scimitar: null,
    dagger: null,
    warhammer: null,
    spear: null,
    halberd: null,
    flail: null,
    mace: null,
    quarterstaff: null,
    crossbow: null,
    longbow: null,
    shortbow: null,
    dart: null,
    sling: null,
    club: null,
    styleTwoHanded: null,
    styleSwordAndShield: null,
    styleSingleWeapon: null,
    styleTwoWeapons: null,
  };

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    this.state = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x0), 'UINT32');

    this.hpMax = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x4), 'INT16');

    this.hpMin = !!handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xe0), 'INT32');

    this.ac = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x6), 'INT16');

    this.thac0 = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x10), 'INT16');

    this.thac0BonusRight = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xe4), 'INT32');

    this.thac0BonusLeft = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xe8), 'INT32');

    this.apr = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x12), 'INT16');

    this.xp = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x5c), 'UINT32');

    this.luck = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x42), 'INT16');

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

    this.drainImmunity = !!handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x2ec), 'INT32');

    this.turnUndeadImmunity = !!handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x2b4),
      'INT32',
    );

    this.profs.bastardSword = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0xf8),
      'INT32',
    );

    this.profs.longsword = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xfc), 'INT32');

    this.profs.shortsword = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x100),
      'INT32',
    );

    this.profs.axe = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x104), 'INT32');

    this.profs.twoHandedSword = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x108),
      'INT32',
    );

    this.profs.katana = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x10c), 'INT32');

    this.profs.scimitar = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x110), 'INT32');

    this.profs.dagger = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x114), 'INT32');

    this.profs.warhammer = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x118), 'INT32');

    this.profs.spear = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x11c), 'INT32');

    this.profs.halberd = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x120), 'INT32');

    this.profs.flail = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x124), 'INT32');

    this.profs.mace = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x128), 'INT32');

    this.profs.quarterstaff = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x12c),
      'INT32',
    );

    this.profs.crossbow = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x130), 'INT32');

    this.profs.longbow = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x134), 'INT32');

    this.profs.shortbow = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x138), 'INT32');

    this.profs.dart = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x13c), 'INT32');

    this.profs.sling = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x140), 'INT32');

    this.profs.club = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0x160), 'INT32');

    this.profs.styleTwoHanded = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x150),
      'INT32',
    );

    this.profs.styleSwordAndShield = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x154),
      'INT32',
    );

    this.profs.styleSingleWeapon = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x158),
      'INT32',
    );

    this.profs.styleTwoWeapons = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x15c),
      'INT32',
    );

    for (let i: number = 1; i < 10; i++) {
      const spellLevelImmunity: number = handlers.memread.memReadNumber(
        this.base + BigInt(0x0 + 0x398 + i * 4),
        'INT32',
      );

      if (!spellLevelImmunity) {
        break;
      }

      this.spellLevelImmunity = i;
    }

    this.castingTimeMod = handlers.memread.memReadNumber(this.base + BigInt(0x0 + 0xd0), 'INT16');
  }
}
