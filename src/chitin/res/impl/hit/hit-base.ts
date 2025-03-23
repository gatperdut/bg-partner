import { Res } from '@chitin/res/impl/res';
import { handlers } from '@handlers';
import { EffKey } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { EffsaveValue } from '@tables/eff/effsave';
import { SchoolShortValue, SchoolValue } from '@tables/school';

export abstract class HitBase {
  // Memory fields
  public key: EffKey;

  public param1: number;

  public param2: number;

  public resource: string;

  public duration: number;

  public durtype: DurtypeKey;

  public prob1: number;

  public prob2: number;

  public save: EffsaveValue;

  public bypassMirrorImage: boolean;

  public saveBonus: number;

  public school: SchoolValue;

  public schoolShort: SchoolShortValue;

  public lowestLevel: number;

  public highestLevel: number;

  public diceThrown: number;

  public diceSides: number;

  // Custom fields
  public res: Res;

  public resSet(): void {
    switch (this.key) {
      case 146:
        this.res = handlers.chitin.ress.SPL[this.resource];
        break;
      case 177:
        this.res = handlers.chitin.ress.EFF[this.resource];
        break;
    }
  }
}
