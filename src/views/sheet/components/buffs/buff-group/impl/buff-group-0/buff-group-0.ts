import { Eff } from '@sprite/effs/impl/eff';
import { Eff0TypeKey, eff0TypeTab } from '@tables/eff/eff0type';
import { BuffGroup, BuffGroupData } from '@views/sheet/components/buffs/buff-group/buff-group';
import { BuffRight } from '@views/sheet/components/buffs/parts/buff-right/buff-right';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffGroup0Data = BuffGroupData & {
  rightHtml: string;
};

export class BuffGroup0 extends BuffGroup {
  protected buffGroup0Data: BuffGroup0Data;

  constructor(effs: Eff[]) {
    super(
      effs[0].duration,
      effs[0].durtype,
      effs[0].casterLevel,
      effs[0].spellLevel,
      effs[0].school,
      effs[0].schoolShort,
      effs[0].key,
      effs[0].name,
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffGroup0);

    const mods: Record<Eff0TypeKey, number> = {
      0: null,
      1: null,
      2: null,
      4: null,
      8: null,
      16: null,
    };

    _.each(effs, (eff: Eff): void => {
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
    });

    const rightTitle: string =
      'Armor class\n' +
      _.map(
        _.filter(
          _.keys(mods).map(Number) as Eff0TypeKey[],
          (key: Eff0TypeKey): boolean => !_.isNull(mods[key]),
        ),
        (key: Eff0TypeKey): string => `${eff0TypeTab[key]}: ${mods[key]}`,
      ).join('\n');

    this.buffGroup0Data = {
      ...this.buffGroupData,
      imageHtml: new Image(effs[0].resImage, effs[0].ressrc.name, null).html,
      rightHtml: new BuffRight('🛡️', rightTitle).html,
    };

    this.html = compiled(this.buffGroup0Data);
  }
}
