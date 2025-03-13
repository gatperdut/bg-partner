import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { Component, ComponentData } from '../../../component/component';

export type BuffImageData = ComponentData & {
  base64: string;

  valign: number;

  tippyHtml: string;
};

export class BuffImage extends Component {
  constructor(components: ComponentsRecord, eff: Eff, title: string, tippyHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffImage);

    const valign: number = Math.floor((32 - eff.resImage.size.height) / 2);

    const buffImageData: BuffImageData = {
      base64: eff.resImage.base64,
      valign: valign,
      title: title,
      tippyHtml: tippyHtml,
    };

    this.html = compiled(buffImageData);
  }
}
