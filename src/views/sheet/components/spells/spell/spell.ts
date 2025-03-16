import { ResSpl } from '@chitin/res/impl/res-spl';
import { Component, ComponentData } from '@views/shared/component';
import { Image } from '@views/sheet/components/image/image';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type SpellData = ComponentData & {
  imageHtml: string;
};

export class Spell extends Component {
  protected spellData: SpellData;

  constructor(resSpl: ResSpl) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.spell);

    this.spellData = {
      ...this.componentData,
      imageHtml: new Image(resSpl.resImage, resSpl.name, null).html,
    };

    this.html = compiled(this.spellData);
  }
}
