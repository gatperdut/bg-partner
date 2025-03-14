import Handlebars from 'handlebars';
import * as _ from 'lodash-es';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { EffKey } from '../../../../../tables/eff';
import { sheetdata } from '../../../../../views/sheet/sheetdata';
import { Component, ComponentData } from '../../component/component';
import { BuffFactory } from './buff-factory';

export type BuffsData = ComponentData & {
  buffsSingleHtml: string[];

  buffsGroupHtml: string[];
};

export class Buffs extends Component {
  constructor() {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.components.buffs);

    const buffsSingleHtml: string[] = _.map(
      _.filter(sheetdata.spriteView.effs.effs.buffs, (eff: Eff): boolean => !eff.grouped),
      (eff: Eff): string => BuffFactory.single(eff).html
    );

    const buffsGroupsById: Record<number, Eff[]> = _.groupBy(
      _.filter(sheetdata.spriteView.effs.effs.buffs, (eff: Eff): boolean => eff.grouped),
      (eff: Eff): EffKey => eff.key
    );

    const buffsGroupHtml: string[] = _.map(
      _.keys(buffsGroupsById).map(Number),
      (id: number): string => BuffFactory.group(buffsGroupsById[id]).html
    );

    const buffsData: BuffsData = {
      ...this.componentData,
      buffsSingleHtml: buffsSingleHtml,
      buffsGroupHtml: buffsGroupHtml,
    };

    this.html = compiled(buffsData);
  }
}
