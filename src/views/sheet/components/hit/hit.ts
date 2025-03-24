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

  public static effsHidden: EffKey[] = [82, 123, 139, 240, 324];

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.hit);

    const hits: string[] = _.compact([
      this.enchantment(true, sheetdata.sprite.gear.mainhand),
      sheetdata.sprite.gear.offhand ? this.enchantment(false, sheetdata.sprite.gear.offhand) : null,
      ...this.resEffHits(),
      ...this.resItmHits(),
    ]);

    this.hitData = {
      ...this.componentData,
      hits: hits,
    };

    this.html = compiled(this.hitData);
  }

  private enchantment(mainhand: boolean, weapon: ResItm): string {
    let result: string = mainhand ? 'Mainhand weapon:' : 'Offhand weapon:';

    result += ` ${weapon.name || ' unnamed weapon'}.`;

    result += ` Strikes as +${weapon.enchantment}.`;

    result += weapon.magical ? ' Magical.' : '';

    result += weapon.silver ? ' Silver.' : '';

    result += weapon.coldiron ? ' Cold iron.' : '';

    return result;
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
    return _.compact([
      ...this.resItmHitFactory(sheetdata.sprite.gear.mainhand),
      ...this.resItmHitFactory(sheetdata.sprite.gear.launcher),
      ...this.resItmHitFactory(sheetdata.sprite.gear.offhand),
    ]);
  }

  private resEffHitFactory(eff: EffHit): string {
    let result: string = this.resEffHitName(eff) + '.';

    // @ts-ignore
    const f = this[`hit${eff.resEff.resEffHit.key}`];
    if (f) {
      const fresult: string = f.bind(this)(eff);

      if (!fresult) {
        return;
      }

      result += fresult;
    }

    result += this.mitigation(eff.resEff.resEffHit);

    result += this.duration(eff.resEff.resEffHit);

    result += this.bypassMirrorImage(eff.resEff.resEffHit);

    return result;
  }

  private resItmHitFactory(weapon: ResItm): string[] {
    const result: string[] = [];

    if (!weapon) {
      return result;
    }

    const resItmHitsMelee: ResItmHit[] = _.filter(
      weapon.resItmHitsMelee,
      (resItmHit: ResItmHit): boolean => !_.includes(Hit.effsHidden, resItmHit.key),
    );

    const resItmHitsRanged: ResItmHit[] = _.filter(
      weapon.resItmHitsRanged,
      (resItmHit: ResItmHit): boolean => !_.includes(Hit.effsHidden, resItmHit.key),
    );

    _.each(
      [...resItmHitsMelee, ...resItmHitsRanged],
      (resItmHit: ResItmHit, index: number): void => {
        const type: string = _.includes([0xf, 0x12, 0x1b], weapon.type)
          ? 'Launcher'
          : !resItmHitsMelee.length || index >= resItmHitsMelee.length
          ? 'Ranged'
          : 'Melee';

        let subresult: string = this.resItmHitName(type, weapon, resItmHit) + '.';

        // @ts-ignore
        const f = this[`hit${resItmHit.key}`];
        if (f) {
          const fresult: string = f.bind(this)(resItmHit);

          if (!fresult) {
            return;
          }

          subresult += fresult;
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

  private resItmHitName(type: string, weapon: ResItm, resItmHit: ResItmHit): string {
    return `(${type}) (${weapon.name || 'Unnamed weapon'}) ${this.school(resItmHit.schoolShort)} ${
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
    let result: string = '';

    const first: number = hitBase.param2 & 0x0000ffff;

    switch (first) {
      case 0:
        result += ' General: always.';
        break;
      case 1:
        result += ' General: caster level.';
        break;
      case 2:
        result += ` General: level ${hitBase.param1}.`;
        break;
    }

    const second: number = hitBase.param2 >> 16;

    switch (second) {
      case 0:
        result += ' Magical weapon: always.';
        break;
      case 1:
        result += ' Magical weapon: never.';
        break;
      case 2:
        result += ` Magical weapon: caster level.`;
        break;
    }

    return result;
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
    const key: EffKey = (hitBase.res as ResEff).key;

    if (_.includes(Hit.effsHidden, key)) {
      return null;
    }

    return ` ${effTab[key]}: ${this.creatureType(hitBase)}`;
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
