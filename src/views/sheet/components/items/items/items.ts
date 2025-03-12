import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ResItm } from '../../../../../chitin/res/impl/res-itm';
import { ComponentsRecord } from '../../../../../components/components';
import { Component } from '../../component/component';
import { Item } from '../item/item';

export type ItemsData = {
  itemHtmls: string[];
};

export class Items extends Component {
  constructor(protected components: ComponentsRecord, resItms: ResItm[]) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(this.components.items);

    const itemHtmls: string[] = _.map(
      resItms,
      (resItm: ResItm): string => new Item(components, resItm).html
    );

    const itemsData: ItemsData = {
      itemHtmls: itemHtmls,
    };

    this.html = compiled(itemsData);
  }
}
