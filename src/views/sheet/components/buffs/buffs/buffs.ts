import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { EffKey } from '../../../../../tables/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Component, ComponentData } from '../../component/component';
import { BuffFactory } from './buff-factory';

export type BuffsData = ComponentData & {
  buffsSingleHtml: string[];

  buffsGroupHtml: string[];
};

export class Buffs extends Component {
  constructor(components: ComponentsRecord, private params: SheetAPIUpdateParams) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffs);

    const buffsSingleHtml: string[] = _.map(
      _.filter(this.params.spriteView.effs.effs.buffs, (eff: Eff): boolean => !eff.grouped),
      (eff: Eff): string => BuffFactory.single(components, this.params, eff).html
    );

    const buffsGroupsById: Record<number, Eff[]> = _.groupBy(
      _.filter(this.params.spriteView.effs.effs.buffs, (eff: Eff): boolean => eff.grouped),
      (eff: Eff): EffKey => eff.key
    );

    const buffsGroupHtml: string[] = _.map(
      _.keys(buffsGroupsById).map(Number),
      (id: number): string => BuffFactory.group(components, this.params, buffsGroupsById[id]).html
    );

    const buffsData: BuffsData = {
      title: null,
      buffsSingleHtml: buffsSingleHtml,
      buffsGroupHtml: buffsGroupHtml,
    };

    this.html = compiled(buffsData);
  }
}
