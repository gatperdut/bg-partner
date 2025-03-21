import { ResEff } from '@chitin/res/impl/eff/res-eff';
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
        result.push(this.hitFactory(eff.resEff));
      },
    );

    return result;
  }

  private hitFactory(resEff: ResEff): string {
    switch (resEff.key) {
      case 55:
        return this.hit55(resEff);
      default:
        return effTab[resEff.key];
    }
  }

  private hit55(resEff: ResEff): string {
    // @ts-ignore
    const creatureType: string = idsTab[resEff.param2][resEff.param1];

    return `${effTab[resEff.key]}: ${creatureType.toLowerCase()} ${resEff.highest}HD or lesser.`;
  }
}
