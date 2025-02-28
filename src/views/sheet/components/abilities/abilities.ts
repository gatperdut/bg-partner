import Handlebars from 'handlebars';
import { DerivedView } from '../../sprite-view';

export class Abilities {
  public html: string;

  constructor(templateAbilities: string, private derivedView: DerivedView) {
    const compiled = Handlebars.compile(templateAbilities);

    this.html = compiled(derivedView);
  }
}
