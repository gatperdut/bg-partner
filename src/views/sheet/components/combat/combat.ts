import { Eff } from '@sprite/effs/impl/eff';
import { WeapprofKey, weapprofTab, WeapprofValue } from '@tables/weapprof';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type CombatData = ComponentData & {
  ac: number;
  thac0: number;
  thac0Left: number;
  thac0BonusLeft: number;
  apr: string;
  xp: number;
  weapprofs: string;
};

// TODO If thac0BonusLeft happens to be exactly 0, the offhand thac0 won't be displayed.
export class Combat extends Component {
  protected combatData: CombatData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.combat);

    const aprView: number = this.aprView();

    const weapprofs: string = this.weapprofs();

    this.combatData = {
      ...this.componentData,
      ac: sheetdata.spriteView.derived.ac,
      thac0: sheetdata.spriteView.derived.thac0 - sheetdata.spriteView.derived.thac0BonusRight,
      thac0Left: sheetdata.spriteView.derived.thac0 - sheetdata.spriteView.derived.thac0BonusLeft,
      thac0BonusLeft: sheetdata.spriteView.derived.thac0BonusLeft,
      apr: Number.isInteger(aprView) ? aprView.toString() : `${aprView * 2}/2`,
      xp: sheetdata.spriteView.derived.xp,
      weapprofs: weapprofs,
    };

    this.html = compiled(this.combatData);
  }

  private aprView(): number {
    let apr: number = sheetdata.spriteView.derived.apr;

    if (apr > 5) {
      apr = 0.5 + (apr - 6);
    }

    const haste: boolean = !!(sheetdata.spriteView.derived.state & 0x8000);

    if (haste) {
      apr *= 2;
    }

    return apr;
  }

  private weapprofs(): string {
    const result: Partial<Record<WeapprofValue, number>> = {};

    _.each(sheetdata.spriteView.effs.effs.profs, (eff233: Eff): void => {
      const key: WeapprofKey = eff233.param2 as WeapprofKey;

      const value: WeapprofValue = weapprofTab[key];

      if (!value) {
        return;
      }

      if (!result[weapprofTab[key]]) {
        result[value] = 0;
      }

      result[value] += eff233.param1;
    });

    if (!Object.keys(result).length) {
      return null;
    }

    return _.map(
      _.keys(result),
      (value: WeapprofValue) => `${value}: ${'+'.repeat(result[value])}`,
    ).join('\n');
  }
}
