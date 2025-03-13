import Handlebars from 'handlebars';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { sheetdata } from '../../../../../../views/sheet/sheetdata';
import { BuffRight } from '../../parts/buff-right/buff-right';
import { BuffSingle, BuffSingleData } from '../buff-single';

export type BuffSingle159Data = BuffSingleData;

export class BuffSingle159 extends BuffSingle {
  protected buffSingle159Data: BuffSingle159Data;

  constructor(eff: Eff) {
    super(eff);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(
      sheetdata.components.buffSingle159
    );

    this.buffSingle159Data = {
      ...this.buffSingleData,
      rightHtml: new BuffRight(eff.param1, 'Number of images left.').html,
    };

    this.html = compiled(this.buffSingle159Data);
  }
}
