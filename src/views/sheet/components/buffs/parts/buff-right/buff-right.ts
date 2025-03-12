import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Component } from '../../../component/component';

export type BuffRightData = {
  value: number;

  tooltip: string;
};

export class BuffRight extends Component {
  constructor(components: ComponentsRecord, value: number, tooltip: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffRight);

    const buffRightData: BuffRightData = {
      value: value,
      tooltip: tooltip,
    };

    this.html = compiled(buffRightData);
  }
}
