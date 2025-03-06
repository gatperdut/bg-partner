import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Effect } from '../effect/effect';

export class Effects {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    const effects: string[] = _.map(
      _.filter(
        [...params.spriteView.timedEffs.effs, ...params.spriteView.equippedEffs.effs],
        (eff: Eff): boolean => !_.includes([42, 233, 313], eff.id)
      ),
      (eff: Eff): string => new Effect(components, params, eff).html
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.effects);

    this.html = compiled({
      effects: effects,
    });
  }
}
