import Handlebars from 'handlebars';
import { DerivedView } from '../../sprite-view';

export class Saves {
  public html: string;

  constructor(templateAbilities: string, derivedView: DerivedView) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(templateAbilities);

    this.html = compiled(derivedView);
  }
}
