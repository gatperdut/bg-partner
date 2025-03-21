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

    const hits: string[] = this.hits();

    this.hitData = {
      ...this.componentData,
      hits: hits,
    };

    this.html = compiled(this.hitData);
  }

  private hits(): string[] {
    const result: string[] = [];

    _.each(
      _.filter(sheetdata.spriteView.effs.effs.hit, (eff: Eff): boolean =>
        [248, 249].includes(eff.key),
      ),
      (eff: EffHit): void => {
        result.push(this.hitFactory(eff));
      },
    );

    return result;
  }

  private hitFactory(eff: EffHit): string {
    let result: string = this.name(eff) + '.';

    // @ts-ignore
    const f = this[`hit${eff.resEff.key}`];
    if (f) {
      result += f.bind(this)(eff);
    }

    result += this.mitigation(eff);

    result += this.duration(eff);

    result += this.bypassMirrorImage(eff);

    return result;
  }

  private name(eff: EffHit): string {
    return (
      `(${eff.key === 248 ? 'Melee' : 'Ranged'}) ` +
      (eff.ressrc.name ? `(${eff.ressrc.name}).` : '') +
      ' ' +
      effTab[eff.resEff.key]
    );
  }

  private hit55(eff: EffHit): string {
    // @ts-ignore
    const creatureType: string = idsTab[eff.resEff.param2][eff.resEff.param1];

    return ` ${creatureType} ${eff.resEff.highestLevel}HD or lesser.`;
  }

  private hit60(eff: EffHit): string {
    return ` ${eff.resEff.param1}%.`;
  }

  private mitigation(eff: EffHit): string {
    const save: string = eff.resEff.save
      ? `save vs ${eff.resEff.save}${
          eff.resEff.saveBonus ? ' at ' + eff.resEff.saveBonus + '.' : ''
        }`
      : 'no save.';

    return ` ${eff.resEff.prob1}% ${save}`;
  }

  private duration(eff: EffHit): string {
    switch (eff.resEff.durtype) {
      case 0:
        const duration: string[] = [];

        const roundsTotal: number = Math.floor(eff.resEff.duration / 6);

        const turns: number = Math.floor(roundsTotal / 10);

        const rounds: number = roundsTotal % 10;

        const seconds: number = eff.resEff.duration % 6;

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
        return eff.resEff.durtype + ' ❓.';
    }
  }

  private bypassMirrorImage(eff: EffHit): string {
    return eff.resEff.bypassMirrorImage ? ' 👤' : '';
  }
}
