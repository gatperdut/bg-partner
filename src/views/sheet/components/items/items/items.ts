import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { Component, ComponentData } from '@views/shared/component';
import { Item } from '@views/sheet/components/items/item/item';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type ItemsData = ComponentData & {
  itemHtmls: string[];
};

export class Items extends Component {
  protected itemsData: ItemsData;

  constructor(resItms: ResItm[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.items);

    this.itemsData = {
      ...this.componentData,
      itemHtmls: _.map(resItms, (resItm: ResItm): string => new Item(resItm).html),
    };

    this.html = compiled(this.itemsData);
  }
}
