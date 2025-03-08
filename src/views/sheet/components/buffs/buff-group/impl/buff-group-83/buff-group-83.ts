import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ResItm } from '../../../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../../../../../../components/components';
import { Eff83 } from '../../../../../../../sprite/effs/impl/eff-83';
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

    const eff: Eff83 = this.effs[0];

    const proImages: string[] = _.flatten(
      _.map(this.effs, (eff: Eff83): string[] => eff.proImages)
    );

    const proNames = _.map(
      _.flatten(_.map(this.effs, (eff: Eff83): ResItm[] => eff.proItms)),
      (a) => a.name
    );

    console.log(
      _.map(
        _.flatten(_.map(this.effs, (eff: Eff83): ResItm[] => eff.proItms)),
        (proItm: ResItm) => proItm.bam
      )
    );

    this.html = compiled({
      items: _.map(proImages, (proImage: string, index: number) => ({
        id: eff.id,
        image: eff.image,
        duration: Math.round((eff.duration - params.spriteView.basic.time) / 15),
        proImage: proImage,
        name: proNames[index],
      })),
    });
  }
}
