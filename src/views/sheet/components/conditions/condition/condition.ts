import Handlebars from 'handlebars';
import { Effect } from '../../../../../sprite/effects/impl/effect';

export class Condition {
  public html: string;

  constructor(templateCondition: string, effect: Effect) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(templateCondition);

    if (effect.id !== 218) {
      return;
    }

    this.html = compiled(effect);
  }
}
