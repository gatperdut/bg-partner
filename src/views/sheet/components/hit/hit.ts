import { HitBase } from '@chitin/res/impl/hit/hit-base';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { ResItmHit } from '@chitin/res/impl/itm/res-itm-hit';
import { Eff } from '@sprite/effs/impl/eff';
import { EffHit } from '@sprite/effs/impl/eff-hit';
import { effTab } from '@tables/eff';
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

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.hit);

    const hits: string[] = [...this.resEffHits(), ...this.resItmHits()];

    this.hitData = {
      ...this.componentData,
      hits: hits,
    };

    this.html = compiled(this.hitData);
  }

  private resEffHits(): string[] {
    const result: string[] = [];

    _.each(
      _.filter(sheetdata.spriteView.effs.effs.hit, (eff: Eff): boolean =>
        [248, 249].includes(eff.key),
      ),
      (eff: EffHit): void => {
        result.push(this.resEffHitFactory(eff));
      },
    );

    return result;
  }

  private resItmHits(): string[] {
    return this.resItmHitFactory(sheetdata.spriteView.gear.weapon);
  }

  private resEffHitFactory(eff: EffHit): string {
    let result: string = this.resEffHitName(eff) + '.';

    result += this.school(eff.resEff.resEffHit);

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
      [...weapon.resItmHitsMelee, ...weapon.resItmHitsRanged],
      (resItmHit: ResItmHit): void => {
        let subresult: string = this.resItmHitName(weapon, resItmHit) + '.';

        subresult += this.school(resItmHit);

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
      (eff.ressrc.name ? `(${eff.ressrc.name}).` : '') +
      ' ' +
      effTab[eff.resEff.resEffHit.key]
    );
  }

  private resItmHitName(weapon: ResItm, resItmHit: ResItmHit): string {
    return `(${weapon.name}) ${effTab[resItmHit.key]}`;
  }

  private hit55(hitBase: HitBase): string {
    // @ts-ignore
    const creatureType: string = idsTab[hitBase.param2][hitBase.param1];

    return ` ${creatureType} ${hitBase.highestLevel}HD or lesser.`;
  }

  private hit60(hitBase: HitBase): string {
    return ` ${hitBase.param1}%.`;
  }

  private school(hitBase: HitBase): string {
    return (hitBase.schoolShort ?? 'NONE') !== 'NONE' ? ` (${hitBase.schoolShort})` : '';
  }

  private mitigation(hitBase: HitBase): string {
    const save: string = hitBase.save
      ? `save vs ${hitBase.save}${hitBase.saveBonus ? ' at ' + hitBase.saveBonus + '.' : ''}`
      : 'no save.';

    return ` ${hitBase.prob1}% ${save}`;
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

        return ` ${duration.join(' ')}.`;
      case 1:
        return ` ♾️.`;
      default:
        return hitBase.durtype + ' ❓.';
    }
  }

  private bypassMirrorImage(hitBase: HitBase): string {
    return hitBase.bypassMirrorImage ? ' 👤' : '';
  }
}
