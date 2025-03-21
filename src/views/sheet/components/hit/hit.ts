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
    const result: string[] = [];

    switch (eff.resEff.key) {
      case 55:
        return this.hit55(eff);
      default:
        return this.name(eff) + eff.resEff.key;
    }
  }

  private name(eff: EffHit): string {
    return (
      `(${eff.key === 248 ? 'Melee' : 'Ranged'}) ` +
      (eff.ressrc.name ? `(${eff.ressrc.name}) ` : '') +
      effTab[eff.resEff.key]
    );
  }

  private hit55(eff: EffHit): string {
    // @ts-ignore
    const creatureType: string = idsTab[eff.resEff.param2][eff.resEff.param1];

    return `${this.name(eff)}: ${creatureType.toLowerCase()} ${
      eff.resEff.highestLevel
    }HD or lesser.`;
  }
}
