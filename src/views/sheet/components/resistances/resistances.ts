import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../src/components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { DerivedView } from '../../sprite-view';
import { Component } from '../component/component';

export class Resistances extends Component {
  constructor(
    components: ComponentsRecord,
    params: SheetAPIUpdateParams,
    derivedView: DerivedView
  ) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.resistances);

    this.html = compiled(derivedView);
  }
}
