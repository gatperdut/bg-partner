import { Effs } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { Component, ComponentData } from '@views/shared/component';
import { BuffFactory } from '@views/sheet/components/buffs/buffs/buff-factory';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type SourcesData = ComponentData & {
  buffHtmls: string[];
};

export class Sources extends Component {
  constructor(sources: Record<string, Eff[]>) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.sources);

    const buffHtmls: string[] = _.map(_.flatten(_.values(sources)), (eff: Eff): string => {
      if (!_.includes(Effs.effsGrouped, eff.key)) {
        return BuffFactory.single(eff).html;
      }
    });

    _.each(
      _.filter(
        _.keys(sources),
        (code: string): boolean => _.uniq(_.map(sources[code], (eff: Eff) => eff.key)).length === 1,
      ),
      (code: string): void => {
        buffHtmls.push(BuffFactory.group(sources[code]).html);
      },
    );

    const sourcesData: SourcesData = {
      ...this.componentData,
      buffHtmls: buffHtmls,
    };

    this.html = compiled(sourcesData);
  }
}
