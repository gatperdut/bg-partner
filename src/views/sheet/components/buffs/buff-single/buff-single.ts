import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import { Buff, BuffData } from '@views/sheet/components/buffs/buff/buff';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffSingleData = BuffData;

export class BuffSingle extends Buff {
  protected buffSingleData: BuffSingleData;

  public static effsHidden: EffKey[] = [33, 101];

  constructor(eff: Eff) {
    super(
      eff.duration,
      eff.durtype,
      eff.casterLevel,
      eff.spellLevel,
      eff.school,
      eff.schoolShort,
      eff.key,
      eff.name,
    );

    if (_.includes(BuffSingle.effsHidden, eff.key)) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle);

    this.buffSingleData = {
      ...this.buffData,
      imageHtml: new Image(eff.resImage, eff.ressrc.name, null).html,
    };

    this.html = compiled(this.buffSingleData);
  }
}
