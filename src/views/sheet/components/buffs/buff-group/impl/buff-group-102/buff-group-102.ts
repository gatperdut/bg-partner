import Handlebars from 'handlebars';
import * as _ from 'lodash-es';
import { Eff } from '../../../../../../../sprite/effs/impl/eff';
import { Image } from '../../../../../../../views/sheet/components/image/image';
import { sheetdata } from '../../../../../../../views/sheet/sheetdata';
import { BuffRight } from '../../../parts/buff-right/buff-right';
import { BuffGroup, BuffGroupData } from '../../buff-group';

export type BuffGroup102Data = BuffGroupData & {
  rightHtml: string;
};

export class BuffGroup102 extends BuffGroup {
  protected buffGroup102Data: BuffGroup102Data;

  constructor(effs: Eff[]) {
    super(effs[0].duration, effs[0].casterLevel, effs[0].spellLevel);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffGroup102
    );

    const max: number = Math.max(..._.map(effs, (eff: Eff): number => eff.param1));

    this.buffGroup102Data = {
      ...this.buffGroupData,
      imageHtml: new Image(effs[0].resImage, effs[0].ressrc.name, null).html,
      rightHtml: new BuffRight(max, 'Maximum level').html,
    };

    this.html = compiled(this.buffGroup102Data);
  }
}
