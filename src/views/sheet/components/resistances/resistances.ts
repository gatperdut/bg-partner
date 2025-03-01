import Handlebars from 'handlebars';
import { DerivedView } from '../../sprite-view';

export class Resistances {
  public html: string;

  constructor(templateResistances: string, derivedView: DerivedView) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(templateResistances);

    this.html = compiled(derivedView);
  }
}
