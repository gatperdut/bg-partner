import { ResEff } from '@chitin/res/impl/eff/res-eff';
import { HitBase } from '@chitin/res/impl/hit/hit-base';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { ResItmHit } from '@chitin/res/impl/itm/res-itm-hit';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { Eff } from '@sprite/effs/impl/eff';
import { EffHit } from '@sprite/effs/impl/eff-hit';
import { EffKey, effTab } from '@tables/eff';
import { idsTab } from '@tables/ids/ids';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type HitData = ComponentData & {
  hits: string[];
};

export class Hit extends Component {
  protected hitData: HitData;

  public static effsHidden: EffKey[] = [139, 240, 324];

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.hit);

    const hits: string[] = _.compact([
      this.enchantment(),
      ...this.resEffHits(),
      ...this.resItmHits(),
    ]);

    this.hitData = {
      ...this.componentData,
      hits: hits,
    };

    this.html = compiled(this.hitData);
  }

  private enchantment(): string {
    const weapon: ResItm = sheetdata.sprite.gear.mainhand;

    return `Weapon: ${weapon.name || 'Unnamed weapon'}. Strikes as +${weapon.enchantment}.`;
  }

  private resEffHits(): string[] {
    const result: string[] = [];

    _.each(
      _.filter(sheetdata.sprite.effs.effs.hit, (eff: Eff): boolean => [248, 249].includes(eff.key)),
      (eff: EffHit): void => {
        result.push(this.resEffHitFactory(eff));
      },
    );

    return result;
  }

  private resItmHits(): string[] {
    return this.resItmHitFactory(sheetdata.sprite.gear.mainhand);
  }

  private resEffHitFactory(eff: EffHit): string {
    let result: string = this.resEffHitName(eff) + '.';

    // @ts-ignore
    const f = this[`hit${eff.resEff.resEffHit.key}`];
    if (f) {
      result += f.bind(this)(eff);
    }

    result += this.mitigation(eff.resEff.resEffHit);

    result += this.duration(eff.resEff.resEffHit);

    result += this.bypassMirrorImage(eff.resEff.resEffHit);

    return result;
  }

  private resItmHitFactory(weapon: ResItm): string[] {
    const result: string[] = [];

    _.each(
      _.filter(
        [...weapon.resItmHitsMelee, ...weapon.resItmHitsRanged],
        (resItmHit: ResItmHit): boolean => !_.includes(Hit.effsHidden, resItmHit.key),
      ),
      (resItmHit: ResItmHit): void => {
        let subresult: string = this.resItmHitName(weapon, resItmHit) + '.';

        // @ts-ignore
        const f = this[`hit${resItmHit.key}`];
        if (f) {
          subresult += f.bind(this)(resItmHit);
        }

        subresult += this.mitigation(resItmHit);

        subresult += this.duration(resItmHit);

        subresult += this.bypassMirrorImage(resItmHit);

        result.push(subresult);
      },
    );

    return result;
  }

  private resEffHitName(eff: EffHit): string {
    return (
      `(${eff.key === 248 ? 'Melee' : 'Ranged'}) ` +
      this.school(eff.resEff.resEffHit.schoolShort) +
      (eff.ressrc.name ? `(${eff.ressrc.name}).` : '') +
      ' ' +
      effTab[eff.resEff.resEffHit.key]
    );
  }

  private resItmHitName(weapon: ResItm, resItmHit: ResItmHit): string {
    return `(${weapon.name || 'Unnamed weapon'}) ${this.school(resItmHit.schoolShort)} ${
      effTab[resItmHit.key]
    }`;
  }

  private hit12(hitBase: HitBase): string {
    let type: string;

    switch (hitBase.param2 & 0xfffffff0) {
      case 0x00000000:
        type = 'crushing';
        break;
      case 0x00010000:
        type = 'acid';
        break;
      case 0x00020000:
        type = 'cold';
        break;
      case 0x00040000:
        type = 'electricity';
        break;
      case 0x00080000:
        type = 'fire';
        break;
      case 0x00100000:
        type = 'piercing';
        break;
      case 0x00200000:
        type = 'poison';
        break;
      case 0x00400000:
        type = 'magic';
        break;
      case 0x00800000:
        type = 'missile';
        break;
      case 0x01000000:
        type = 'slashing';
        break;
      case 0x08000000:
        type = 'non-lethal';
        break;
      default:
        type = 'unknown';
    }

    let damage: string = '';

    if (hitBase.lowestLevel && hitBase.highestLevel) {
      damage += `${hitBase.lowestLevel}d${hitBase.highestLevel}`;
    }

    if (hitBase.param1) {
      damage += `+${hitBase.param1}`;
    }

    return ` ${damage} ${type}`;
  }

  private hit17(hitBase: HitBase): string {
    switch (hitBase.param2) {
      case 0:
        return ` +${hitBase.param1}HP.`;
      case 1:
        return ` HP=${hitBase.param1}.`;
      case 2:
        return ` HPx${(hitBase.param1 / 100).toFixed(1)}.`;
    }
  }

  private hit25(hitBase: HitBase): string {
    switch (hitBase.param2) {
      case 0:
        return ' 1HP/s';
      case 1:
        return ' 1HP/s';
      case 2:
        return ` ${hitBase.param1}HP/s`;
      case 3:
        return ` 1HP/${hitBase.param1 > 1 ? hitBase.param1 : ''}s`;
      case 4:
        ' ❓';
        return;
    }
  }

  private hit44(hitBase: HitBase): string {
    return ` ${hitBase.param1 > 0 ? '+' : ''}${hitBase.param1}.`;
  }

  private hit55(hitBase: HitBase): string {
    return (
      ` ${this.creatureType(hitBase)}` +
      (hitBase.highestLevel ? ` ${hitBase.highestLevel}HD or lesser.` : '.')
    );
  }

  private hit58(hitBase: HitBase): string {
    const first: number = hitBase.param2 >> 16;

    // TODO we could also deal with how it dispels magical weapons.
    switch (first) {
      case 0:
        return ' Always.';
      case 1:
        return ' Caster level.';
      case 2:
        return ` Level ${hitBase.param1}.`;
    }
  }

  private hit60(hitBase: HitBase): string {
    return ` ${hitBase.param1}%.`;
  }

  private hit109(hitBase: HitBase): string {
    return ` ${this.creatureType(hitBase)}`;
  }

  private hit146(hitBase: HitBase): string {
    let level: string = hitBase.param1 ? `level ${hitBase.param1}` : 'caster level';

    if (hitBase.param2 === 1 || hitBase.param1 === 0) {
      level = 'caster level';
    } else {
      level = `level ${hitBase.param1}`;
    }

    return ` ${(hitBase.res as ResSpl).name} at ${level}`;
  }

  private hit177(hitBase: HitBase): string {
    return ` ${effTab[(hitBase.res as ResEff).key]}: ${this.creatureType(hitBase)}`;
  }

  private hit216(hitBase: HitBase): string {
    return ` ${hitBase.param1} levels.`;
  }

  private hit238(hitBase: HitBase): string {
    return ` ${this.creatureType(hitBase)}.`;
  }

  private school(schoolShort: string): string {
    return (schoolShort ?? 'NONE') !== 'NONE' ? ` (${schoolShort})` : '';
  }

  private mitigation(hitBase: HitBase): string {
    const save: string = hitBase.save
      ? `save vs ${hitBase.save}${
          hitBase.saveBonus
            ? ' at ' + (hitBase.saveBonus > 0 ? '+' : '') + hitBase.saveBonus + '.'
            : ''
        }`
      : 'no save.';

    return ` ${hitBase.prob1 - hitBase.prob2}% ${save}`;
  }

  private duration(hitBase: HitBase): string {
    switch (hitBase.durtype) {
      case 0:
        const duration: string[] = [];

        const roundsTotal: number = Math.floor(hitBase.duration / 6);

        const turns: number = Math.floor(roundsTotal / 10);

        const rounds: number = roundsTotal % 10;

        const seconds: number = hitBase.duration % 6;

        if (turns) {
          duration.push(turns + 'T');
        }

        if (turns || rounds) {
          duration.push(rounds + 'R');
        }

        if (seconds) {
          duration.push(seconds + 'S');
        }

        if (!duration.length) {
          return '';
        }
        return ` ${duration.join(' ')}.`;
      case 1:
      case 9:
        return ` ♾️`;
      default:
        return hitBase.durtype + ' ❓';
    }
  }

  private bypassMirrorImage(hitBase: HitBase): string {
    return hitBase.bypassMirrorImage ? ' 👤' : '';
  }

  private creatureType(hitBase: HitBase): string {
    // @ts-ignore
    return idsTab[hitBase.param2][hitBase.param1];
  }
}
