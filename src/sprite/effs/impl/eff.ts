import { Res } from '@chitin/res/impl/res';
import { ResItm } from '@chitin/res/impl/res-itm';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResImage } from '@chitin/res/res-image';
import { handlers } from '@handlers';
import { EffSource, Effs } from '@sprite/effs/effs';
import { EffKey, effTab } from '@tables/eff';
import { resextValueSubset } from '@tables/resext';
import { SchoolKey, SchoolValue, schoolTab } from '@tables/school';
import _ from 'lodash';

const RessrcTypes = resextValueSubset(['ITM', 'SPL'] as const);

export type RessrcType = (typeof RessrcTypes)[number];

export abstract class Eff {
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

  public duration: number;

  public durationType: number;

  public casterLevel: number;

  public spellLevel: number;

  // Custom fields
  public ressrcType: RessrcType;

  public ressrc: ResItm | ResSpl;

  public resImage: ResImage;

  public grouped: boolean;

  constructor(public key: EffKey, protected base: bigint, public source: EffSource) {
    this.school =
      schoolTab[handlers.memread.memReadNumber(base + BigInt(0x8 + 0x44), 'UINT32') as SchoolKey];

    this.secondaryType = handlers.memread.memReadNumber(base + BigInt(0x8 + 0xc8), 'INT32');

    this.res = handlers.memread.memReadString(base + BigInt(0x8 + 0x28));

    this.res2 = handlers.memread.memReadString(base + BigInt(0x8 + 0x68));

    this.res3 = handlers.memread.memReadString(base + BigInt(0x8 + 0x70));

    this.param1 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x14), 'INT32');

    this.param2 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x18), 'INT32'); // EEEx says + 0x58?

    this.param3 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x5c), 'INT32');

    this.param4 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x60), 'INT32');

    this.param5 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x64), 'INT32');

    this.duration = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x20), 'INT32');

    this.durationType = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x1c), 'INT32');

    this.casterLevel = handlers.memread.memReadNumber(base + BigInt(0x8 + 0xc0), 'INT32');

    this.spellLevel = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x10), 'INT32');

    this.ressrcSetup(handlers.memread.memReadString(base + BigInt(0x8 + 0x8c)).toLowerCase());

    this.resImageSetup();

    this.grouped = _.includes(Effs.effsGrouped, this.key);
  }

  private ressrcSetup(ressrcStrref: string): void {
    if (!ressrcStrref) {
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

        this.ressrc = ressrc as ResSpl | ResItm;

        break;
      }
    }
  }

  private resImageSetup(): void {
    if (!this.ressrc) {
      return;
    }

    this.resImage = this.ressrc.resImage;
  }

  public summary(): void {
    console.log(
      `${this.key} ${effTab[this.key]} 1:${this.param1} 2:${this.param2} 3:${this.param3} 4:${
        this.param4
      } 5:${this.param5} res:${this.res} res2:${this.res2} res3:${this.res3} source:${
        this.ressrc?.code
      } durType:${this.durationType}`,
    );
  }
}
