import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import { Component, ComponentData } from '@views/shared/component';
import { BuffFactory } from '@views/sheet/components/buffs/buffs/buff-factory';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffsData = ComponentData & {
  buffSinglesHtml: string[];

  buffGroupsHtml: string[];

  buffItemsHtml: string[];
};

export class Buffs extends Component {
  constructor(buffs: Eff[], fromItem: boolean) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffs);

    const buffSinglesHtml: string[] = this.buffSinglesHtml(buffs, fromItem);

    const buffGroupsHtml: string[] = this.buffGroupsHtml(buffs, fromItem);

    const buffItemsHtml: string[] = this.buffItemsHtml(buffs, fromItem);

    const buffsData: BuffsData = {
      ...this.componentData,
      buffSinglesHtml: buffSinglesHtml,
      buffGroupsHtml: buffGroupsHtml,
      buffItemsHtml: buffItemsHtml,
    };

    this.html = compiled(buffsData);
  }

  private buffSinglesHtml(buffs: Eff[], fromItem: boolean): string[] {
    return _.map(
      _.filter(
        buffs,
        (eff: Eff): boolean => (fromItem || eff.ressrcType === 'SPL') && !eff.grouped,
      ),
      (eff: Eff): string => BuffFactory.single(eff).html,
    );
  }

  private buffGroupsHtml(buffs: Eff[], fromItem: boolean): string[] {
    const buffGroupsByKey: Record<number, Eff[]> = _.groupBy(
      _.filter(buffs, (eff: Eff): boolean => (fromItem || eff.ressrcType === 'SPL') && eff.grouped),
      (eff: Eff): EffKey => eff.key,
    );

    return _.map(
      _.keys(buffGroupsByKey).map(Number),
      (effKey: EffKey): string => BuffFactory.group(buffGroupsByKey[effKey]).html,
    );
  }

  private buffItemsHtml(buffs: Eff[], fromItem: boolean): string[] {
    const buffItemsByCode: Record<string, Eff[]> = _.groupBy(
      _.filter(buffs, (eff: Eff): boolean => !fromItem && eff.ressrcType === 'ITM'),
      (eff: Eff): string => eff.ressrcParent.code,
    );

    return _.map(
      _.keys(buffItemsByCode),
      (code: string): string => BuffFactory.item(buffItemsByCode[code]).html,
    );
  }
}
