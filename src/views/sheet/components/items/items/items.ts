import { ResItm } from '@chitin/res/impl/res-itm';
import { Component, ComponentData } from '@views/sheet/components/component/component';
import { Item } from '@views/sheet/components/items/item/item';
import { sheetdata } from '@views/sheet/sheetdata';
import * as Handlebars from 'handlebars';
import * as _ from 'lodash-es';

export type ItemsData = ComponentData & {
  itemHtmls: string[];
};

export class Items extends Component {
  protected itemsData: ItemsData;

  constructor(resItms: ResItm[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.components.items);

    this.itemsData = {
      ...this.componentData,
      itemHtmls: _.map(resItms, (resItm: ResItm): string => new Item(resItm).html),
    };

    this.html = compiled(this.itemsData);
  }
}
