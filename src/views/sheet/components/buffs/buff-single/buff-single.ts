import { Eff } from '@sprite/effs/impl/eff';
import { EffKey, effTab } from '@tables/eff';
import { Buff, BuffData } from '@views/sheet/components/buffs/buff/buff';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffSingleData = BuffData;

export class BuffSingle extends Buff {
  protected buffSingleData: BuffSingleData;

  public static effsHidden: EffKey[] = [33, 34, 35, 36, 37, 133];

  public static effsHiddenIfItm: EffKey[] = [101];

  public static effsHiddenUnlessItm: EffKey[] = [166];

  public static effsHiddenUnlessTimed: EffKey[] = [101];

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

    if (_.includes(BuffSingle.effsHiddenIfItm, eff.key) && eff.ressrcType === 'ITM') {
      return;
    }

    if (_.includes(BuffSingle.effsHiddenUnlessItm, eff.key) && eff.ressrcType !== 'ITM') {
      return;
    }

    if (_.includes(BuffSingle.effsHiddenUnlessTimed, eff.key) && eff.durtype !== 4096) {
      return;
    }

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSingle);

    this.buffSingleData = {
      ...this.buffData,
      imageHtml: new Image(eff.resImage, eff.ressrc.name || effTab[eff.key], null).html,
    };

    this.html = compiled(this.buffSingleData);
  }
}
