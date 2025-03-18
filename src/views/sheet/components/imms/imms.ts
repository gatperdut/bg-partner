import { Effs } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { Eff206 } from '@sprite/effs/impl/eff-206';
import { EffKey, effTab } from '@tables/eff';
import { Eff120TypeKey, eff120TypeTab } from '@tables/eff/eff120type';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type ImmsData = ComponentData & {
  weapons: string;

  misc: string;

  opcodes: string;

  spells: string;
};

export class Imms extends Component {
  protected immsData: ImmsData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.imms);

    const weapons: string = this.weapons();

    const misc: string = this.misc();

    const opcodes: string = this.opcodes();

    const spells: string = this.spells();

    this.immsData = {
      ...this.componentData,
      weapons: weapons,
      misc: misc,
      opcodes: opcodes,
      spells: spells,
    };

    this.html = compiled(this.immsData);
  }

  private weapons(): string {
    const result: string[] = [];

    let enchantment: number = 0;

    _.each(
      _.filter(sheetdata.spriteView.effs.effs.imms, (eff: Eff): boolean => eff.key === 120),
      (eff120: Eff): void => {
        if (eff120.param2 === 0) {
          if (eff120.param1 > enchantment) {
            enchantment = eff120.param1;
          }
        } else {
          result.push(eff120TypeTab[eff120.param2 as Eff120TypeKey]);
        }
      },
    );

    if (enchantment > 0) {
      result.unshift(`Immune to +${enchantment} or lower weapons`);
    }

    return _.uniq(result).join(', ');
  }

  private misc(): string {
    const result: string[] = [];

    if (sheetdata.spriteView.derived.seeInvisible) {
      result.push('Sees through invisibility.');
    }

    if (sheetdata.spriteView.derived.backstabImmunity) {
      result.push('Immune to backstab.');
    }

    if (sheetdata.spriteView.derived.timestopImmunity) {
      result.push('Immune to timestop.');
    }

    return result.join('. ');
  }

  private opcodes(): string {
    const result: string[] = [];

    _.each(
      _.filter(sheetdata.spriteView.effs.effs.imms, (eff: Eff): boolean => eff.key === 101),
      (eff101: Eff): void => {
        if (!_.includes(Effs.effsIgnored, eff101.param2)) {
          result.push(effTab[eff101.param2 as EffKey]);
        }
      },
    );

    return _.uniq(result).sort().join(', ');
  }

  private spells(): string {
    const result: string[] = [];

    _.each(
      _.filter(sheetdata.spriteView.effs.effs.imms, (eff: Eff): boolean => eff.key === 206),
      (eff206: Eff206): void => {
        result.push(eff206.splName);
      },
    );

    return _.uniq(result).sort().join(', ');
  }
}
