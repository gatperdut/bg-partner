import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Effect } from '../../../../../sprite/effects/impl/effect';
import { SpriteView } from '../../../sprite-view';
import { Condition } from '../condition/condition';

export class Conditions {
  public html: string;

  constructor(componentsRecord: ComponentsRecord, spriteView: SpriteView) {
    const conditions: string[] = _.map(
      spriteView.timedEffects.effects,
      (effect: Effect): string => new Condition(componentsRecord.condition, effect).html
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(componentsRecord.conditions);

    this.html = compiled({
      conditions: conditions,
    });
  }
}
