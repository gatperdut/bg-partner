import { ResImage } from '@chitin/res/image/res-image';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type ImageData = ComponentData & {
  base64: string;

  width: number;

  height: number;

  halign: number;

  valign: number;

  tooltipHtml: string;
};

export class Image extends Component {
  private imageData: ImageData;

  constructor(resImage: ResImage, title: string, tooltipHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.image);

    const height: number = Math.min((resImage || sheetdata.resImageDefault).size.height, 35);

    const width: number = Math.floor(
      (resImage || sheetdata.resImageDefault).size.width *
        (height / (resImage || sheetdata.resImageDefault).size.height),
    );

    this.imageData = {
      ...this.componentData,
      title: title,
      base64: (resImage || sheetdata.resImageDefault).base64,
      width: width,
      height: height,
      halign: Math.floor(width / 2),
      valign: Math.floor(height / 2),
      tooltipHtml: tooltipHtml,
    };

    this.html = compiled(this.imageData);
  }
}
