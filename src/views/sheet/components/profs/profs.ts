import { Eff } from '@sprite/effs/impl/eff';
import { WeapprofKey, weapprofTab, WeapprofValue } from '@tables/weapprof';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type ProfsData = ComponentData & {
  weapprofs: Partial<Record<WeapprofValue, number>>;
};

export class Profs extends Component {
  protected profsData: ProfsData;

  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.profs);

    const weapprofs: Partial<Record<WeapprofValue, number>> = {};

    _.each(sheetdata.spriteView.effs.effs.profs, (eff233: Eff): void => {
      const key: WeapprofKey = eff233.param2 as WeapprofKey;

      const value: WeapprofValue = weapprofTab[key];

      if (!weapprofs[weapprofTab[key]]) {
        weapprofs[value] = 0;
      }

      weapprofs[value] += eff233.param1;
    });

    this.profsData = {
      ...this.componentData,
      weapprofs: Object.keys(weapprofs).length ? weapprofs : null,
    };

    this.html = compiled(this.profsData);
  }
}
