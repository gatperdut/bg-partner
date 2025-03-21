import { Eff } from '@sprite/effs/impl/eff';
import { effTab } from '@tables/eff';
import { Eff0TypeKey, eff0TypeTab } from '@tables/eff/eff0type';
import { BuffSingle, BuffSingleData } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffSingle0Data = BuffSingleData & {
  rightHtml: string;
};

export class BuffSingle0 extends BuffSingle {
  protected buffSingle0Data: BuffSingle0Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle0);

    const mods: Record<Eff0TypeKey, number> = {
      0: null,
      1: null,
      2: null,
      4: null,
      8: null,
      16: null,
    };

    const key: Eff0TypeKey = eff.param2 as Eff0TypeKey;

    if (_.isNull(mods[key])) {
      mods[key] = eff.param1 * (key !== 16 ? -1 : 1);
    } else {
      if (key !== 16) {
        mods[key] -= eff.param1;
      } else {
        if (mods[key] > eff.param1) {
          mods[key] = eff.param1;
        }
      }
    }

    const rightTitle: string =
      'Armor class\n' +
      _.map(
        _.filter(
          _.keys(mods).map(Number) as Eff0TypeKey[],
          (key: Eff0TypeKey): boolean => !_.isNull(mods[key]),
        ),
        (key: Eff0TypeKey): string => `${eff0TypeTab[key]}: ${mods[key]}`,
      ).join('\n');

    this.buffSingle0Data = {
      ...this.buffSingleData,
      imageHtml: new Image(eff.resImage, eff.ressrc.name || effTab[eff.key], null).html,
      rightHtml: new BuffRight('🛡️', rightTitle).html,
    };

    this.html = compiled(this.buffSingle0Data);
  }
}
