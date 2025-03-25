import { ResImage } from '@chitin/res/image/res-image';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { Res } from '@chitin/res/impl/res';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { handlers } from '@handlers';
import { EffSource, Effs } from '@sprite/effs/effs';
import { EffKey, EffValue, effTab } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { effdefaultTab } from '@tables/effdefault';
import { resextValueSubset } from '@tables/resext';
import {
  SchoolKey,
  SchoolShortValue,
  SchoolValue,
  schoolShortTab,
  schoolTab,
} from '@tables/school';
import _ from 'lodash';

const RessrcTypes = resextValueSubset(['ITM', 'SPL'] as const);

export type RessrcType = (typeof RessrcTypes)[number];

export abstract class Eff {
  public loaded: boolean = true;

  // Memory fields
  public school: SchoolValue;

  public secondaryType: number;

  public res: string;

  public res2: string;

  public res3: string;

  public param1: number;

  public param2: number;

  public param3: number;

  public param4: number;

  public param5: number;

  public special: number;

  public duration: number;

  public durtype: DurtypeKey;

  public casterLevel: number;

  public spellLevel: number;

  // Custom fields
  public name: EffValue;

  public schoolShort: SchoolShortValue;

  public ressrcType: RessrcType;

  public ressrc: ResItm | ResSpl;

  public ressrcParent: ResItm;

  public resImage: ResImage;

  public resImageParent: ResImage;

  public grouped: boolean;

  public squeezed: boolean;

  constructor(public key: EffKey, protected base: bigint, public source: EffSource) {
    this.name = effTab[key];

    const schoolKey: SchoolKey = handlers.memread.memReadNumber(
      base + BigInt(0x8 + 0x44),
      'UINT32',
    ) as SchoolKey;

    this.school = schoolTab[schoolKey];

    this.schoolShort = schoolShortTab[schoolKey];

    this.secondaryType = handlers.memread.memReadNumber(base + BigInt(0x8 + 0xc8), 'INT32');

    this.res = handlers.memread.memReadString(base + BigInt(0x8 + 0x28), 8).toLowerCase();

    this.res2 = handlers.memread.memReadString(base + BigInt(0x8 + 0x68), 8).toLowerCase();

    this.res3 = handlers.memread.memReadString(base + BigInt(0x8 + 0x70), 8).toLowerCase();

    this.param1 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x14), 'INT32');

    this.param2 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x18), 'INT32'); // EEEx says + 0x58?

    this.param3 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x5c), 'INT32');

    this.param4 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x4c), 'INT32'); // EEEx says + 0x60?

    this.param5 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x64), 'INT32');

    this.special = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x40), 'UINT32');

    this.duration = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x20), 'INT32');

    this.durtype = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x1c), 'INT32') as DurtypeKey;

    this.casterLevel = handlers.memread.memReadNumber(base + BigInt(0x8 + 0xc0), 'INT32');

    this.spellLevel = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x10), 'INT32');

    this.ressrcSetup(handlers.memread.memReadString(base + BigInt(0x8 + 0x8c), 8).toLowerCase());

    this.grouped = _.includes(Effs.effsGrouped, this.key);

    this.squeezed = _.includes(_.flatten(Effs.effsSqueezes), this.key);
  }

  private ressrcSetup(ressrcStrref: string): void {
    if (!ressrcStrref) {
      this.loaded = false;

      return;
    }

    for (let i: number = 0; i < RessrcTypes.length; i++) {
      const ressrcType: RessrcType = RessrcTypes[i];

      const ressrc: Res = _.find(
        handlers.chitin.ress[ressrcType],
        (res: Res): boolean => res.code === ressrcStrref,
      );

      if (ressrc) {
        this.ressrcType = ressrcType;

        switch (this.ressrcType) {
          case 'SPL':
            this.ressrc = ressrc as ResSpl;

            this.resImage = this.ressrc.resImage || this.resImageDefault();

            break;
          case 'ITM':
            this.ressrc = this.ressrcDefault(ressrc);

            this.ressrcParent = ressrc as ResItm;

            this.resImage = this.resImageDefault();

            this.resImageParent = this.ressrcParent.resImage;

            break;
        }

        break;
      }
    }
  }

  private ressrcDefault(ressrcFallback: Res): ResSpl {
    let res = handlers.chitin.ress.SPL[effdefaultTab[this.key]];

    if (!res) {
      res = ressrcFallback;
    }

    return res as ResSpl;
  }

  private resImageDefault(): ResImage {
    return this.ressrcDefault(this.ressrc).resImage;
  }

  public summary(): void {
    console.log(
      `${this.key} ${effTab[this.key]} 1:${this.param1} 2:${this.param2} 3:${this.param3} 4:${
        this.param4
      } 5:${this.param5} res:${this.res} res2:${this.res2} res3:${this.res3} source:${
        this.ressrc?.code
      } durType:${this.durtype}`,
    );
  }
}
