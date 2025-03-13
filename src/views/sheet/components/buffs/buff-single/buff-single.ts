import Handlebars from 'handlebars';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { Image } from '../../../../../views/sheet/components/image/image';
import { sheetdata } from '../../../../../views/sheet/sheetdata';
import { Buff, BuffData } from '../buff/buff';

export type BuffSingleData = BuffData;

export class BuffSingle extends Buff {
  protected buffSingleData: BuffSingleData;

  constructor(eff: Eff) {
    super(eff.duration, eff.casterLevel, eff.spellLevel);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffSingle
    );

    this.buffSingleData = {
      ...this.buffData,
      imageHtml: new Image(eff.resImage, eff.ressrc.name, null).html,
    };

    this.html = compiled(this.buffSingleData);
  }
}
