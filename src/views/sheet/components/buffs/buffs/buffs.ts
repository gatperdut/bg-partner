import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Buff } from '../buff/buff';

export class Buffs {
  public html: string;

  constructor(private components: ComponentsRecord, private params: SheetAPIUpdateParams) {
    const buffs: string[] = _.map(
      this.params.spriteView.effs.effs.buffs,
      (eff: Eff): string => new Buff(this.components, this.params, eff).html
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffs);

    this.html = compiled({
      buffs: buffs,
    });
  }
}
