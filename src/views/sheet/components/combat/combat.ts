import { WeapprofKey, WeapprofKeys, weapprofTab } from '@tables/weapprof';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type CombatData = ComponentData & {
  ac: number;
  thac0: number;
  thac0Left: number;
  thac0BonusLeft: number;
  offhand: boolean;
  apr: string;
  xp: number;
  luck: number;
  weapprofs: string;
};

export class Combat extends Component {
  protected combatData: CombatData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.combat);

    const aprView: number = this.aprView();

    const weapprofs: string = this.weapprofs();

    this.combatData = {
      ...this.componentData,
      ac: sheetdata.sprite.derived.ac,
      thac0: sheetdata.sprite.derived.thac0 - sheetdata.sprite.derived.thac0BonusRight,
      thac0Left: sheetdata.sprite.derived.thac0 - sheetdata.sprite.derived.thac0BonusLeft,
      thac0BonusLeft: sheetdata.sprite.derived.thac0BonusLeft,
      offhand: !!sheetdata.sprite.gear.offhand && !!sheetdata.sprite.derived.thac0BonusLeft,
      apr: Number.isInteger(aprView) ? aprView.toString() : `${aprView * 2}/2`,
      xp: sheetdata.sprite.derived.xp,
      luck: sheetdata.sprite.derived.luck,
      weapprofs: weapprofs,
    };

    this.html = compiled(this.combatData);
  }

  private aprView(): number {
    let apr: number = sheetdata.sprite.derived.apr;

    if (apr > 5) {
      apr = 0.5 + (apr - 6);
    }

    const haste: boolean = !!(sheetdata.sprite.derived.state & 0x8000);

    if (haste) {
      apr *= 2;
    }

    return apr;
  }

  private weapprofs(): string {
    const result: string[] = [];

    _.each(WeapprofKeys, (key: WeapprofKey): void => {
      if (sheetdata.sprite.derived.profs[key] > 0) {
        result.push(`${weapprofTab[key]}: ${'+'.repeat(sheetdata.sprite.derived.profs[key])}`);
      }
    });

    if (!result.length) {
      result.push('No weapon proficiencies');
    }

    return result.join('\n');
  }
}
