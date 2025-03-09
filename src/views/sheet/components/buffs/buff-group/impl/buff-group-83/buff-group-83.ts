import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff83, Eff83Entry } from '../../../../../../../sprite/effs/impl/eff-83';
import { SheetAPIUpdateParams } from '../../../../../renderer';
import { BuffGroup } from '../../buff-group';

export class BuffGroup83 extends BuffGroup {
  constructor(
    protected components: ComponentsRecord,
    protected params: SheetAPIUpdateParams,
    protected effs: Eff83[]
  ) {
    super(components, params, effs);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.buffGroup83);

    const entries: Eff83Entry[] = _.flatten(
      _.map(this.effs, (eff: Eff83): Eff83Entry[] => eff.entries)
    );

    console.log(_.map(entries, (entry: Eff83Entry): string => entry.pro.code));

    this.html = compiled({
      entries: _.map(entries, (entry: Eff83Entry) => ({
        id: this.effs[0].id,
        image: entry.image,
        duration: Math.round((this.effs[0].duration - params.spriteView.basic.time) / 15),
        proImage: entry.image,
        code: entry.pro.code,
        name: entry.pro.nameStrref,
      })),
    });
  }
}
