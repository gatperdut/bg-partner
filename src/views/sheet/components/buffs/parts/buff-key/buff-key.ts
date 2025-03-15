import { EffKey, EffValue } from '@tables/eff';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffKeyData = ComponentData & {
  key: EffKey;

  value: EffValue;
};

export class BuffKey extends Component {
  protected buffKeyData: BuffKeyData;

  constructor(effKey: EffKey, effValue: EffValue) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffKey);

    this.buffKeyData = {
      ...this.componentData,
      key: effKey,
      value: effValue,
    };

    this.html = compiled(this.buffKeyData);
  }
}
