import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Effect } from '../effect/effect';

export class Effects {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    const tempList = [
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
      ...params.spriteView.timedEffs.effs,
    ];

    const effects: string[] = _.map(
      _.filter(tempList, (eff: Eff): boolean => eff.secondaryType === 7 && eff.id !== 42),
      (eff: Eff): string => new Effect(components, params, eff).html
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.effects);

    this.html = compiled({
      effects: effects,
    });
  }
}
