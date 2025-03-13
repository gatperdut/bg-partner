import Handlebars from 'handlebars';
import { ResItm } from '../../../../../chitin/res/impl/res-itm';
import { sheetdata } from '../../../../../views/sheet/sheetdata';
import { Component, ComponentData } from '../../component/component';
import { Image } from '../../image/image';

export type ItemData = ComponentData & {
  imageHtml: string;
};

export class Item extends Component {
  protected itemData: ItemData;

  constructor(resItm: ResItm) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.components.item);

    this.itemData = {
      ...this.componentData,
      imageHtml: new Image(resItm.resImage, resItm.name, null).html,
    };

    this.html = compiled(this.itemData);
  }
}
