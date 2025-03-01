import Handlebars from 'handlebars';
import { DerivedView } from '../../sprite-view';

export class Resistances {
  public html: string;

  constructor(templateResistances: string, private derivedView: DerivedView) {
    const compiled = Handlebars.compile(templateResistances);

    this.html = compiled(derivedView);
  }
}
