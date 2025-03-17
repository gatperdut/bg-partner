import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type CombatData = ComponentData & {
  ac: number;
  thac0: number;
  apr: string;
  xp: number;
};

export class Combat extends Component {
  protected combatData: CombatData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.combat);

    const aprView: number = this.aprView();

    this.combatData = {
      ...this.componentData,
      ac: sheetdata.spriteView.derived.ac,
      thac0: sheetdata.spriteView.derived.thac0,
      apr: Number.isInteger(aprView) ? aprView.toString() : `${aprView}/2`,
      xp: sheetdata.spriteView.derived.xp,
    };

    this.html = compiled(this.combatData);
  }

  private aprView(): number {
    let apr: number = sheetdata.spriteView.derived.apr;

    if (apr <= 5) {
      return apr;
    }

    apr = 0.5 + (apr - 6);

    if (sheetdata.spriteView.derived.state & 0x8000) {
      apr *= 2;
    }

    // TODO add +1 if offhand.

    return apr;
  }
}
