import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Effect } from '../../../../../sprite/effects/impl/effect';
import { SpriteView } from '../../../sprite-view';
import { Condition } from '../condition/condition';

export class Conditions {
  public html: string;

  constructor(componentsRecord: ComponentsRecord, spriteView: SpriteView) {
    const conditions: Condition[] = _.map(
      spriteView.timedEffects.effects,
      (effect: Effect): Condition => new Condition(componentsRecord.condition, effect)
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(componentsRecord.effectsGroup);

    this.html = compiled({
      conditions: conditions,
    });
  }
}

// const effect: Effect218 = _.find(
//   this.spriteView.timedEffects.effects,
//   (effect: Effect): boolean => {
//     return effect.resSource === 'SPWI408';
//   }
// ) as Effect218;

// const image: HTMLImageElement = document.getElementById('timedEffects') as HTMLImageElement;
// image.src = `data:image/png;base64,${effect.image}`;
// image.width = effect.size.width * 6;
// image.height = effect.size.height * 6;
