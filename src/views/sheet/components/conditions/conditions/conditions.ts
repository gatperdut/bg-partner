import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Effect } from '../../../../../sprite/effects/impl/effect';
import { SheetAPIUpdateParams } from '../../../../../views/sheet/renderer';
import { Condition } from '../condition/condition';

export class Conditions {
  public html: string;

  constructor(components: ComponentsRecord, params: SheetAPIUpdateParams) {
    const conditions: string[] = _.map(
      params.spriteView.timedEffects.effects,
      (effect: Effect): string => new Condition(components, params, effect).html
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.conditions);

    this.html = compiled({
      conditions: conditions,
    });
  }
}
