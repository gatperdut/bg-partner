import { ResItm } from '@chitin/res/impl/res-itm';
import { Component, ComponentData } from '@views/shared/component';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type ItemData = ComponentData & {
  imageHtml: string;
};

export class Item extends Component {
  protected itemData: ItemData;

  constructor(resItm: ResItm) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.item);

    this.itemData = {
      ...this.componentData,
      imageHtml: new Image(resItm.resImage, resItm.name, null).html,
    };

    this.html = compiled(this.itemData);
  }
}
