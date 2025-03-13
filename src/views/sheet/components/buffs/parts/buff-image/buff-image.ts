import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { Component, ComponentData } from '../../../component/component';

export type BuffImageData = ComponentData & {
  base64: string;

  halign: number;

  valign: number;

  tippyHtml: string;
};

export class BuffImage extends Component {
  constructor(components: ComponentsRecord, eff: Eff, title: string, tippyHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffImage);

    const halign: number = Math.floor(eff.resImage.size.width / 2);

    const valign: number = Math.floor(eff.resImage.size.height / 2);

    const buffImageData: BuffImageData = {
      base64: eff.resImage.base64,
      halign: halign,
      valign: valign,
      title: title,
      tippyHtml: tippyHtml,
    };

    this.html = compiled(buffImageData);
  }
}
