import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/impl/eff';
import { EffKey } from '../../../../../tables/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { Component, ComponentData } from '../../component/component';
import { BuffFactory } from './buff-factory';

export type BuffsData = ComponentData & {
  buffsSingle: string[];

  buffsGroups: string[];
};

export class Buffs extends Component {
  constructor(components: ComponentsRecord, private params: SheetAPIUpdateParams) {
    super(components);

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffs);

    const buffsSingle: string[] = _.map(
      _.filter(this.params.spriteView.effs.effs.buffs, (eff: Eff): boolean => !eff.grouped),
      (eff: Eff): string => BuffFactory.single(this.components, this.params, eff).html
    );

    const buffsGroupsById: Record<number, Eff[]> = _.groupBy(
      _.filter(this.params.spriteView.effs.effs.buffs, (eff: Eff): boolean => eff.grouped),
      (eff: Eff): EffKey => eff.key
    );

    const buffsGroups: string[] = _.map(
      _.keys(buffsGroupsById).map(Number),
      (id: number): string =>
        BuffFactory.group(this.components, this.params, buffsGroupsById[id]).html
    );

    const buffsData: BuffsData = {
      title: null,
      buffsSingle: buffsSingle,
      buffsGroups: buffsGroups,
    };

    this.html = compiled(buffsData);
  }
}
