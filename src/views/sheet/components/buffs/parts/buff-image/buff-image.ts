import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';
import { Component } from '../../../component/component';

export type BuffImageData = {
  valign: number;

  base64: string;

  tippyHtml: string;
};

export class BuffImage extends Component {
  constructor(components: ComponentsRecord, eff: Eff, tippyHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffImage);

    const valign: number = Math.floor((32 - eff.resImage.size.height) / 2);

    const buffImageData: BuffImageData = {
      valign: valign,
      base64: eff.resImage.base64,
      tippyHtml: tippyHtml,
    };

    this.html = compiled(buffImageData);
  }
}
