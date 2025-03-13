import Handlebars from 'handlebars';
import { Eff83 } from '../../../../../../../sprite/effs/impl/eff-83';
import { Image } from '../../../../../../../views/sheet/components/image/image';
import { sheetdata } from '../../../../../../../views/sheet/sheetdata';
import { BuffGroup, BuffGroupData } from '../../buff-group';
import { BuffGroup83Tooltip } from './tooltips/buff-group-83-tooltip';

export type BuffGroup83Data = BuffGroupData;

export class BuffGroup83 extends BuffGroup {
  protected buffGroup83Data: BuffGroup83Data;

  constructor(effs: Eff83[]) {
    super(effs[0].duration, effs[0].casterLevel, effs[0].spellLevel);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffGroup83
    );

    const tooltip: string = new BuffGroup83Tooltip(effs).html;

    this.buffGroup83Data = {
      ...this.buffGroupData,
      imageHtml: new Image(effs[0].resImage, effs[0].ressrc.name, tooltip).html,
    };

    this.html = compiled(this.buffGroup83Data);
  }
}
