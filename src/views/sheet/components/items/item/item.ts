import Handlebars from 'handlebars';
import { ResItm } from '../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../.././../../components/components';
import { Component, ComponentData } from '../../component/component';
import { Image } from '../../image/image';

export type ItemData = ComponentData & {
  imageHtml: string;
};

export class Item extends Component {
  protected itemData: ItemData;

  constructor(components: ComponentsRecord, resItm: ResItm) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.item);

    this.itemData = {
      ...this.componentData,
      imageHtml: new Image(components, resItm.resImage, resItm.name, null).html,
    };

    this.html = compiled(this.itemData);
  }
}
