import { EffKey } from '@tables/eff';
import { DurtypeKey } from '@tables/eff/durtype';
import { EffsaveValue } from '@tables/eff/effsave';
import { SchoolShortValue, SchoolValue } from '@tables/school';

export abstract class HitBase {
  public key: EffKey;

  public param1: number;

  public param2: number;

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
}
