import Handlebars from 'handlebars';
import { ResItm } from '../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../.././../../components/components';
import { Component, ComponentData } from '../../component/component';
import { Image } from '../../image/image';

export type ItemData = ComponentData & {
  imageHtml: string;
};

export class Item extends Component {
  constructor(components: ComponentsRecord, resItm: ResItm) {
    super(components);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.item);

    const itemsData: ItemData = {
      title: null,
      imageHtml: new Image(components, resItm.resImage, resItm.name, null).html,
    };

    this.html = compiled(itemsData);
  }
}
