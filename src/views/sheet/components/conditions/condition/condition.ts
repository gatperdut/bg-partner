import { Effect } from '../../../../../sprite/effects/impl/effect';

export class Condition {
  public html: string;

  constructor(templateCondition: string, effect: Effect) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(templateCondition);

    this.html = compiled(effect);
  }
}
