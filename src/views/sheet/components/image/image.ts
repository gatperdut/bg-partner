import Handlebars from 'handlebars';
import { ResImage } from '../../../../chitin/res/res-image';
import { sheetdata } from '../../sheetdata';
import { Component, ComponentData } from '../component/component';

export type ImageData = ComponentData & {
  base64: string;

  halign: number;

  valign: number;

  tippyHtml: string;
};

export class Image extends Component {
  private imageData: ImageData;

  constructor(resImage: ResImage, title: string, tippyHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.components.image);

    this.imageData = {
      ...this.componentData,
      title: title,
      base64: resImage.base64,
      halign: Math.floor(resImage.size.width / 2),
      valign: Math.floor(resImage.size.height / 2),
      tippyHtml: tippyHtml,
    };

    this.html = compiled(this.imageData);
  }
}
