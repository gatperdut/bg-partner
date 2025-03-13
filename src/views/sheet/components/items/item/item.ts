import Handlebars from 'handlebars';
import { ResItm } from '../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../.././../../components/components';
import { Component } from '../../component/component';
import { ItemImage } from '../parts/item-image/item-image';

export type ItemData = {
  imageHtml: string;
};

export class Item extends Component {
  constructor(protected components: ComponentsRecord, resItm: ResItm) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.item);

    const itemsData: ItemData = {
      imageHtml: new ItemImage(components, resItm, resItm.name, null).html,
    };

    this.html = compiled(itemsData);
  }
}
