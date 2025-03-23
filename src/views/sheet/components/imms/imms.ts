import { Effs } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { Eff206 } from '@sprite/effs/impl/eff-206';
import { EffKey, effTab } from '@tables/eff';
import { Eff120TypeKey, eff120TypeTab } from '@tables/eff/eff120type';
import { idsTab } from '@tables/ids/ids';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type ImmsData = ComponentData & {
  weapons: string;

  misc: string;

  creatures: string;

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

    const creatures: string = this.creatures();

    const opcodes: string = this.opcodes();

    const spells: string = this.spells();

    this.immsData = {
      ...this.componentData,
      weapons: weapons,
      misc: misc,
      creatures: creatures,
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
      result.unshift(`+${enchantment} enchantment or lesser`);
    }

    return _.uniq(result).join(', ');
  }

  private misc(): string {
    const result: string[] = [];

    if (sheetdata.spriteView.derived.seeInvisible) {
      result.push('Sees through invisibility');
    }

    if (sheetdata.spriteView.derived.backstabImmunity) {
      result.push('Immune to backstab');
    }

    if (sheetdata.spriteView.derived.timestopImmunity) {
      result.push('Immune to timestop');
    }

    if (sheetdata.spriteView.derived.turnUndeadImmunity) {
      result.push('Immune to turn undead');
    }

    if (sheetdata.spriteView.derived.hpMin) {
      result.push('HP cannot be brought down to 0');
    }

    if (sheetdata.spriteView.derived.spellLevelImmunity > 0) {
      result.push(
        `Immune to spell levels ${sheetdata.spriteView.derived.spellLevelImmunity} and below`,
      );
    }

    if (sheetdata.spriteView.derived.castingTimeMod > 0) {
      result.push(`Casting time is modified by ${sheetdata.spriteView.derived.castingTimeMod}`);
    }

    return result.join('. ');
  }

  private creatures(): string {
    const result: string[] = [];
    _.each(
      _.filter(sheetdata.spriteView.effs.effs.imms, (eff: Eff): boolean => eff.key === 100),
      (eff100: Eff): void => {
        //@ts-ignore
        result.push(idsTab[eff100.param2][eff100.param1]);
      },
    );

    return result.join(', ');
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
