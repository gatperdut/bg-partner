import Handlebars from 'handlebars';
import { ResImage } from '../../../../chitin/res/res-image';
import { ComponentsRecord } from '../../../../components/components';
import { Component, ComponentData } from '../component/component';

export type ImageData = ComponentData & {
  base64: string;

  halign: number;

  valign: number;

  tippyHtml: string;
};

export class Image extends Component {
  constructor(components: ComponentsRecord, resImage: ResImage, title: string, tippyHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.image);

    const halign: number = Math.floor(resImage.size.width / 2);

    const valign: number = Math.floor(resImage.size.height / 2);

    const imageData: ImageData = {
      base64: resImage.base64,
      halign: halign,
      valign: valign,
      title: title,
      tippyHtml: tippyHtml,
    };

    this.html = compiled(imageData);
  }
}
