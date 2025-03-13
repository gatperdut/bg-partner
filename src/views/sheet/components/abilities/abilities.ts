import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../components/components';
import { SheetAPIUpdateParams } from '../../renderer';
import { DerivedView } from '../../sprite-view';
import { Component } from '../component/component';

export class Abilities extends Component {
  constructor(
    components: ComponentsRecord,
    params: SheetAPIUpdateParams,
    derivedView: DerivedView
  ) {
    super(components);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.abilities);

    this.html = compiled(derivedView);
  }
}
