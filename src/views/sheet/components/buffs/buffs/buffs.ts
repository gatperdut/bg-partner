import Handlebars from 'handlebars';
import _ from 'lodash-es';
import { ComponentsRecord } from '../../../../../components/components';
import { Eff } from '../../../../../sprite/effs/eff';
import { SheetAPIUpdateParams } from '../../../renderer';
import { BuffSingle } from '../buff-single/buff-single';
import { BuffGroupFactory } from './buff-group-factory';

export class Buffs {
  public html: string;

  constructor(private components: ComponentsRecord, private params: SheetAPIUpdateParams) {
    const buffsSingle: string[] = _.map(
      _.filter(this.params.spriteView.effs.effs.buffs, (eff: Eff): boolean => !eff.grouped),
      (eff: Eff): string => new BuffSingle(this.components, this.params, eff).html
    );

    const buffsGroupsById: Record<number, Eff[]> = _.groupBy(
      _.filter(this.params.spriteView.effs.effs.buffs, (eff: Eff): boolean => eff.grouped),
      'id'
    );

    const buffsGroups: string[] = _.map(
      _.keys(buffsGroupsById).map(Number),
      (id: number): string =>
        BuffGroupFactory.create(id, this.components, this.params, buffsGroupsById[id]).html
    );

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffs);

    this.html = compiled({
      buffsSingle: buffsSingle,
      buffsGroups: buffsGroups,
    });
  }
}
