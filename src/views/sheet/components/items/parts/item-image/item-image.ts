import Handlebars from 'handlebars';
import { ResItm } from '../../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../../../../../components/components';
import { Component } from '../../../component/component';

export type ItemImageData = {
  base64: string;

  valign: number;

  title: string;

  tippyHtml: string;
};

export class ItemImage extends Component {
  constructor(components: ComponentsRecord, resItm: ResItm, title: string, tippyHtml: string) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.itemImage);

    const itemImageData: ItemImageData = {
      base64: resItm.resImage.base64,
      valign: Math.round(resItm.resImage.size.height / 2),
      title: title,
      tippyHtml: tippyHtml,
    };

    this.html = compiled(itemImageData);
  }
}
