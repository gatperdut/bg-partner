import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';

export type BuffImageData = {
  valign: number;

  base64: string;

  tippyHtml: string;
};

export class BuffImage {
  public html: string;

  constructor(components: ComponentsRecord, eff: Eff, tippyHtml: string) {
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
